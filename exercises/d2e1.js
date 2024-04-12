// https://tech-docs.corndel.com/express/creating-a-server.html
// https://tech-docs.corndel.com/express/request-response.html

import express from 'express'

const app = express()

/**
 * Add a single GET /ping endpoint to app -
 * It should respond with the simple string "pong"
 */
app.get('/ping', (req, res) => {
  res.status(200).send('pong')
})


export default app
