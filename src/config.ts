import { config } from "dotenv";
import { resolve } from "path";
import { ENV } from "./constant/environments.constant";
import logger from "./utils/logger.utils";

logger.info(`Loading environment: ${process.env.NODE_ENV}`);
switch (process.env.NODE_ENV) {
    case ENV.LOCAL:
    default:
        config({
            path: resolve(__dirname, "../.env.local")
        });
        logger.info(`Loaded environment: ${ENV.LOCAL}`);
        break;
    case ENV.DEVELOPMENT:
    case ENV.STAGING:
    case ENV.PRODUCTION:
        config({
            path: resolve(__dirname, `../.env.${process.env.NODE_ENV}`)
        });
        logger.info(`Loaded environment: ${ENV.DEVELOPMENT}`);
        break;
}