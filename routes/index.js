import { Router } from 'express'
import userRouter from './users.js'
import productRouter from './products.js'

const api = Router()

api.use('/users', userRouter)
api.use('/products', productRouter)

export default api
