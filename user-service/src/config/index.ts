import { config } from "dotenv";

const configFile = `./.env`;
config({ path: configFile });

const { MONGO_URI, PORT } = process.env;

export default {
    MONGO_URI,
    PORT,
};
