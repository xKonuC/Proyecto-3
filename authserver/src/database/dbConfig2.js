import dotenv from 'dotenv';
dotenv.config();

const dbConfig2 = {
    host: process.env.DB_HOST2,
    user: process.env.DB_USER2,
    password: process.env.DB_PASSWORD2,
    database: process.env.DB_DATABASE2,
    port: process.env.DB_PORT2,
    charset: 'utf8mb4',
}

export default dbConfig2;