import dotenv from 'dotenv'
dotenv.config()

export default {
  port: process.env['API_PORT'] ?? 3000,
  db_uri: process.env['MONGO_URI'] ?? ''
}


