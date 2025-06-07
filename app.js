import express from 'express'
import { AppRouter } from './src/route/index.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT
const appRouter = new AppRouter()

// Middleware
app.use(express.json())

// Routes
app.use('/api', appRouter.getRouter())

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})