// https://tech-docs.corndel.com/express/body-and-headers.html

import express from 'express'

const app = express()
app.use(express.json())

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
  res.json(alarms)
})

app.get('/alarms/:index', (req, res) => {
  res.json(alarms[req.params.index])
})

app.post('/alarms', (req, res) => {
  alarms.push(req.body)
  res.status(201).json(req.body)
})

export default app
