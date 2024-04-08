// https://tech-docs.corndel.com/express/creating-a-server.html
// https://tech-docs.corndel.com/express/request-response.html

import express from 'express'

const app = express()

app.get('/ping', (req, res) => {
  res.send('pong')
})

export default app
