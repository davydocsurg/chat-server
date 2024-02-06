import amqp, { Channel } from "amqplib";
import config from "../config/config";
import { FCMService } from "./FCMService";
import { EmailService } from "./EmailService";
import { UserStatusStore } from "../utils";

class RabbitMQService {
    private channel!: Channel;
    private fcmService = new FCMService();
    private emailService = new EmailService();
    private userStatusStore = new UserStatusStore();

    constructor() {
        this.init();
    }

    async init() {
        const connection = await amqp.connect(config.msgBrokerURL!);
        this.channel = await connection.createChannel();
        await this.consumeNotification();
    }

    async consumeNotification() {
        await this.channel.assertQueue(config.queue.notifications);
        this.channel.consume(config.queue.notifications, async (msg) => {
            if (msg) {
                const {
                    type,
                    userId,
                    message,
                    userEmail,
                    userToken,
                    fromName,
                } = JSON.parse(msg.content.toString());

                if (type === "MESSAGE_RECEIVED") {
                    // Check if the user is online
                    const isUserOnline =
                        this.userStatusStore.isUserOnline(userId);

                    if (isUserOnline && userToken) {
                        // User is online, send a push notification
                        await this.fcmService.sendPushNotification(
                            userToken,
                            message
                        );
                    } else if (userEmail) {
                        // User is offline, send an email
                        await this.emailService.sendEmail(
                            userEmail,
                            `New Message from ${fromName}`,
                            message
                        );
                    }
                }

                this.channel.ack(msg); // Acknowledge the message after processing
            }
        });
    }
}

export const rabbitMQService = new RabbitMQService();
