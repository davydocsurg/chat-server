import { config } from "dotenv";

const configFile = `./.env`;
config({ path: configFile });

const { PORT, JWT_SECRET, NODE_ENV, MESSAGE_BROKER_URL, SENDINBLUE_APIKEY } =
    process.env;

const queue = { notifications: "NOTIFICATIONS" };

export default {
    PORT,
    JWT_SECRET,
    env: NODE_ENV,
    msgBrokerURL: MESSAGE_BROKER_URL,
    SENDINBLUE_APIKEY,
    queue,
};
