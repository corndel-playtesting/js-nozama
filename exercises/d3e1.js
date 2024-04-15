import express, { Router } from 'express'

const app = express()
app.use(express.json())
const router = Router()

/**
 * Hint: Look at app.use() at the bottom of the file -
 * it already supplies the /endpoint prefix to paths in the router
 */

let state = {
  count: 0
}

/**
 * Add a GET /counter endpoint
 * It should simply res.json(state)
 */

router.get('/', (req, res) => {
  res.json(state)
})

/**
 * Add a PUT /counter/increment endpoint
 * It should increase the counter by 1 and then res.json(state)
 */

router.put('/increment', (req, res) => {
  state.count ++
  res.json(state)
})

app.use('/counter', router)

export default app
