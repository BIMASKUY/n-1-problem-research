import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

// Local connection pool configuration
export const pool = new Pool({
  user: process.env.LOCAL_DB_USER,
  host: process.env.LOCAL_DB_HOST,
  database: process.env.LOCAL_DB_NAME,
  password: process.env.LOCAL_DB_PASSWORD,
  port: process.env.LOCAL_DB_PORT,
})

// Supabase connection pool configuration
// export const pool = new Pool({
//   connectionString: process.env.SUPABASE_CONNECTION_STRING,
//   ssl: {
//     rejectUnauthorized: false // Required for Supabase connections
//   }
// })

pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection error:', err.message)
  } else {
    console.log('Successfully connected to PostgreSQL database')
    release() // Release the client back to the pool
  }
})

export const query = async (text, params = []) => {
  try {
    // Add a random parameter to defeat query caching
    const randomSuffix = `/* ${Date.now()}-${Math.random()} */`;
    const nonCachedText = text + randomSuffix;
    
    console.log('Query:', text)
    if (params) console.log('Parameters:', params)
    
    const start = Date.now()
    const result = await pool.query(nonCachedText, params)
    const duration = Date.now() - start
    
    return {
      time: duration,
      data: result.rows,
    }
  } catch (error) {
      console.error('Database query error:', error.message)
      throw error
  }
}