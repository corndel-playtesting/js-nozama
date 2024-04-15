import express, { Router } from 'express'
import { Account } from './d3e2.js' // <-- uses Account from Exercise 2

const app = express()
app.use(express.json())

const router = Router()

router.put('/username', (req, res) => {
  /**
   * Attempt to call Account.updateUsername with the newUsername and
   * password found in the req.body. 
   *
   * On success, respond with the new username in the response body.
   * E.g. { username: 'NewUsername'}
   *
   * In case this fails, use try/catch to respond with the error
   * code and message found in the error
   */
  const {newUsername, password} = req.body

  try {
    Account.updateUsername(newUsername, password)
    res.status(200).send({ username: 'aragorn' })
  } catch (e) {
    res.status(e.code ?? 500).send(e.message ?? 'Server error')
  }
})

app.use('/account', router)

export default app
