import { config } from "dotenv";

const configFile = `./.env`;
config({ path: configFile });

const {
    PORT,
    JWT_SECRET,
    NODE_ENV,
    MESSAGE_BROKER_URL,
    SENDINBLUE_APIKEY,
    EMAIL_FROM,
    SMTP_HOST,
    SMTP_PORT = 587,
    SMTP_USER,
    SMTP_PASS,
} = process.env;

const queue = { notifications: "NOTIFICATIONS" };

export default {
    PORT,
    JWT_SECRET,
    env: NODE_ENV,
    msgBrokerURL: MESSAGE_BROKER_URL,
    SENDINBLUE_APIKEY,
    EMAIL_FROM,
    queue,
    smtp: {
        host: SMTP_HOST,
        port: SMTP_PORT as number,
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
};
