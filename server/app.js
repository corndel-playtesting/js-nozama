import express from 'express'
import api from '../routes/index.js'
import { AppError } from './errors.js'

const app = express()
app.use(express.json())

app.use('/api', api)

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.code).json({ message: err.message })
  } else {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default app
