import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGO_NAME: process.env.MONGO_NAME,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    SESSION_SECRET: process.env.SESSION_SECRET || "secret",
    TOKEN_SECRET: process.env.TOKEN_SECRET || "secret",
    PORT: process.env.PORT || 3000,
    EXPIRES: Date.now() + 1000 * 60 * 60 * 24
}