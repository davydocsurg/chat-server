import amqp from "amqplib";
import config from "../config";
import { FCMService } from "./FCMService";
import { EmailService } from "./EmailService";

interface NotificationPayload {
    type: string;
    userId: string;
    userEmail: string;
    userToken: string;
    message: string;
}

export class RabbitMQService {
    private fcmService = new FCMService();
    private emailService = new EmailService();
    async connect() {
        const connection = await amqp.connect(config.msgBrokerURL!);
        const channel = await connection.createChannel();
        await channel.assertQueue(config.queue.notifications);

        return channel;

        // channel.consume("notifications", async (message) => {
        //     if (message !== null) {
        //         const payload: NotificationPayload = JSON.parse(
        //             message.content.toString()
        //         );

        //         if (payload.type === "MESSAGE_RECEIVED") {
        //             const isUserOnline = await this.checkUserOnlineStatus(
        //                 payload.userId
        //             );

        //             if (isUserOnline) {
        //                 await this.fcmService.sendPushNotification(
        //                     payload.userToken,
        //                     payload.message
        //                 );
        //             } else {
        //                 await this.emailService.sendEmail(
        //                     payload.userEmail,
        //                     "New Message",
        //                     payload.message
        //                 );
        //             }
        //         }

        //         channel.ack(message);
        //     }
        // });
    }

    private async checkUserOnlineStatus(userId: string): Promise<boolean> {
        // Logic to check if the user is currently online
        // This could involve querying a database or another service
        // For simplicity, let's assume a function that returns a boolean
        return false; // Placeholder
    }
}
