import { ConnectionOptions } from "typeorm";
import { env } from "./environment.config";

export const configDb: ConnectionOptions = ({
    type: "postgres",
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DBNAME,
    entities: ["src/entities/*.entity.ts"],
    synchronize: true
})