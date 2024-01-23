import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

function generateToken(id: string) {
  return jwt.sign(id.toString(), process.env['JWT_SECRET'])
}

function authenticateToken(token: string) {
  return jwt.verify(token, process.env['JWT_SECRET']).toString()
}

export {
  generateToken,
  authenticateToken
}
