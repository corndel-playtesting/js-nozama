//tech-docs.corndel.com/express/query-params.html
// https://tech-docs.corndel.com/express/url-params.html

import express from 'express'
const app = express()

app.get('/sumup', (req, res) => {
  const n = req.query.n
  if (n) {
    let sum = 0
    for (let i = 1; i <= n; i++) {
      sum += i
    }
    res.send(sum.toString())
  } else {
    res.send('0')
  }
})

app.get('/multiply/:x/:y', (req, res) => {
  const { x, y } = req.params
  res.send((x * y).toString())
})

export default app
