import dotenv from 'dotenv';
dotenv.config();

const dbConfig2 = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'posgrado_db',
    port: process.env.DB_PORT,
    charset: 'utf8mb4',
}

export default dbConfig2;