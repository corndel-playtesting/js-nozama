import { Router } from 'express'
import User from '../models/User.js'

const router = Router()

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.delete(req.params.id)
    res.status(204).json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.logIn(username, password)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

export default router
