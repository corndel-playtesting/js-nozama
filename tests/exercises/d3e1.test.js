import supertest from 'supertest'
import assert from 'assert'
import { z } from 'zod'
import app from '../../exercises/d3e1.js'

const CounterSchema = z.object({
  count: z.number()
})

describe('Day 3 Exercise 1', () => {
  describe('GET /counter', async function () {
    let response

    before(async function () {
      response = await supertest(app).get('/counter')
    })

    it('should return 200', function () {
      assert.equal(response.status, 200)
    })

    it('should return a state object', function () {
      try {
        CounterSchema.parse(response.body)
      } catch (error) {
        assert.fail(
          `Response did not match the CounterState schema: ${error.message}`
        )
      }
    })
  })

  describe('PUT /counter/increment', async function () {
    let responseBefore
    let response
    let responseAfter

    before(async function () {
      responseBefore = await supertest(app).get('/counter')
      response = await supertest(app).put('/counter/increment')
      responseAfter = await supertest(app).get('/counter')
    })

    it('should return 200', function () {
      assert.equal(response.status, 200)
    })

    it('should return a state object', function () {
      try {
        CounterSchema.parse(response.body)
      } catch (err) {
        assert.fail(err)
      }
    })

    it('should increment the counter', function () {
      assert.equal(responseAfter.body.count, responseBefore.body.count + 1)
    })
  })
})
