import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const DB_URI = process.env.DB_URI || "";

const PORT = process.env.PORT || "";

const JWT_CONFIG = {
    secret: process.env.JWT_SECRET || "",
    expiresIn: process.env.JWT_EXPIRES_IN || ""
};

export {
    DB_URI,
    PORT,
    JWT_CONFIG
}