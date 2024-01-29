import config from "../config";
import { RabbitMQService, FCMService, EmailService } from "../services";
import { UserStatusStore } from "../utils";

export class NotificationController {
    private rabbitMQService = new RabbitMQService();
    private fcmService = new FCMService();
    private emailService = new EmailService();
    private userStatusStore = UserStatusStore.getInstance();

    async handleNotifications() {
        const channel = await this.rabbitMQService.connect();
        channel.consume(config.queue.notifications, async (msg: any) => {
            if (msg) {
                const { type, userId, message, userEmail, userToken } =
                    JSON.parse(msg.content.toString());

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
                            "New Message",
                            message
                        );
                    }
                }

                channel.ack(msg); // Acknowledge the message after processing
            }
        });
    }
}
