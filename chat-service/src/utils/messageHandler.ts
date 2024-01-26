import config from "../config";
import { UserStatusStore } from "./userStatusStore";
import amqp from "amqplib";

const userStatusStore = UserStatusStore.getInstance();

export const handleMessageReceived = async (
    senderId: string,
    receiverId: string,
    messageContent: string
) => {
    const receiverIsOffline = !userStatusStore.isUserOnline(receiverId);

    if (receiverIsOffline) {
        const notificationPayload = {
            type: "MESSAGE_RECEIVED",
            userId: receiverId,
            message: messageContent,
        };

        const connection = await amqp.connect(config.msgBrokerURL!);
        const channel = await connection.createChannel();
        await channel.assertQueue(config.queue.notifications);
        channel.sendToQueue(
            config.queue.notifications,
            Buffer.from(JSON.stringify(notificationPayload))
        );
    }
};
