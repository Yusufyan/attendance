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

  MAIL_HOST: process.env.MAIL_HOST as string,
  mailPort: parseInt(<string>process.env.MAIL_PORT as string),
  MAIL_USER: process.env.MAIL_USER as string,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD as string,

  SECRET_KEY: process.env.SECRET_KEY,
};
