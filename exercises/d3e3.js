import express, { Router } from 'express'
import { Account } from './d3e2.js'

const app = express()
app.use(express.json())

const router = Router()

router.put('/username', (req, res) => {
  const { username, password } = req.body
  try {
    const account = Account.updateUsername(username, password)
    res.json(account)
  } catch (err) {
    res.status(err.code).json({ message: err.message })
  }
})

app.use('/account', router)

export default app
