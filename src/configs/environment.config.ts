import "dotenv/config";

export const env = {
  APP_ENV: process.env.APP_ENV || "development",
  APP_PORT: parseInt(<string>process.env.APP_PORT) || 3000,
  APP_HOST: process.env.APP_HOST || "localhost",
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(<string>process.env.DB_PORT),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DBNAME: process.env.DB_DBNAME,
  SECRET_KEY: process.env.SECRET,
};
