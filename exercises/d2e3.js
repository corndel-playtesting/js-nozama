// https://tech-docs.corndel.com/express/body-and-headers.html

import express from 'express'

const app = express()
app.use(express.json()) // <-- important!

const alarms = [
  {
    time: '08:30',
    message: 'Wake up!'
  },
  {
    time: '17:00',
    message: 'Go home!'
  }
]

app.get('/alarms', (req, res) => {
  /**
   * Responds with all the alarms as a JSON response
   */
  res.json(alarms)
})

app.get('/alarms/:index', (req, res) => {
  /**
   * Responds with the alarm at the given index
   */
  const i = Number.parseInt(req.params.index)
  res.json(alarms[i])
})

app.post('/alarms', (req, res) => {
  /**
   * Request contains a new alarm in the req.body
   * Push it to the end of the alarms array
   * Respond with a 201 status code
   */
  alarms.push(req.body)
  res.status(201).send()
})

export default app
