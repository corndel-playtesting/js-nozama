// https://tech-docs.corndel.com/express/query-params.html
// https://tech-docs.corndel.com/express/url-params.html

import express from 'express'
const app = express()

/**
 * Hint: res.send() will not accept numbers - you will need to
 * convert your result to a string before using res.send()
 */

app.get('/sumup', (req, res) => {
  /**
   * This endpoint accepts a query param, n
   * res.send() the sum of integers from 1 to n
   * if n is not given, respond with 0
   * e.g. /sumup?n=4 => 10

   */
  const n = Number.parseInt(req.query.n ?? 0)
  const count = (n * (n + 1)) / 2

  res.send(count.toString())
})

app.get('/multiply/:x/:y', (req, res) => {
  /**
   * This endpoint responds with the product of x and y
   * e.g. /multiply/:3/:5 => 15
   */
  const x = Number.parseInt(req.params.x)
  const y = Number.parseInt(req.params.y)
  res.send((x * y).toString())
})

export default app
