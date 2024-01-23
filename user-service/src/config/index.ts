import { config } from "dotenv";

const configFile = `./.env`;
config({ path: configFile });

const { MONGO_URI } = process.env;

export default {
    MONGO_URI,
};
