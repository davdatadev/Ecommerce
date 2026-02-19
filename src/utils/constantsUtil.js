import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const constants = {
    JWT_COOKIE_NAME: 'cookieToken', 
    JWT_SECRET: 'CoderToken123',
    PORT: process.env.PORT || 8080,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET || 'SecretKeyDefault',
    JWT_COOKIE_NAME: process.env.JWT_COOKIE_NAME || 'cookieToken',
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD
}

export default __dirname;