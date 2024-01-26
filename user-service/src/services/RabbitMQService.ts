import amqp, { Channel } from "amqplib";
import config from "../config";
import { User } from "../database";

class RabbitMQService {
    private requestQueue = "USER_DETAILS_REQUEST";
    private responseQueue = "USER_DETAILS_RESPONSE";
    private channel!: Channel;

    constructor() {
        this.init();
    }

    async init() {
        const connection = await amqp.connect(config.msgBrokerURL!);
        this.channel = await connection.createChannel();
    }

    async consumeUserDetails() {
        this.channel.consume(this.requestQueue, async (msg) => {
            if (msg) {
                const { userId } = JSON.parse(msg.content.toString());
                const userDetails = User.findById({ userId });
                console.log("====================================");
                console.log(userDetails);
                console.log("====================================");
                this.channel.sendToQueue(
                    this.responseQueue,
                    Buffer.from(JSON.stringify(userDetails)),
                    { correlationId: msg.properties.correlationId }
                );
            }
        });
    }
}

export const rabbitMQService = new RabbitMQService();
