import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Client } = pg;

const client = new Client({
	user: process.env.USER,
	password: process.env.PASSWORD,
	host: process.env.HOST,
	port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : undefined,
	database: process.env.DATABASE,
});

async function connectDatabase(){
    try{
        await client.connect();
        console.log('Database connected successfully!');
    } catch(err){
        console.error('Error connecting database:', err)
        process.exit(1);
    }
}

export {client, connectDatabase};