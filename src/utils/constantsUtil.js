import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const constants = {
    JWT_COOKIE_NAME: 'cookieToken', 
    JWT_SECRET: 'CoderToken123'
}

export default __dirname;