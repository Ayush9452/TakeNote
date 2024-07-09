import pg from "pg";
import dotenv from "dotenv";

dotenv.config({path: "./.env"});
console.log(process.env.DB_USER)

const db = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

db.connect();
export default db;