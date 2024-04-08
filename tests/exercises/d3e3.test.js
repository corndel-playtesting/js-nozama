import supertest from 'supertest'
import { strict as assert } from 'assert'
import app from '../../exercises/d3e3.js'

describe('Day 3 Exercise 3', (req, res) => {
  describe('PUT /account/username', function () {
    it('should require a username', async function () {
      const response = await supertest(app)
        .put('/account/username')
        .send({ password: 'elf4life' })

      assert.equal(response.status, 400, 'Response status should be 400')
    })

    it('should require a password', async function () {
      const response = await supertest(app)
        .put('/account/username')
        .send({ username: 'aragorn' })

      assert.equal(response.status, 401, 'Response status should be 401')
    })

    it('should reject incorrect password', async function () {
      const response = await supertest(app)
        .put('/account/username')
        .send({ username: 'aragorn', password: 'wrongpassword' })

      assert.equal(response.status, 403, 'Response status should be 403')
    })

    it('should allow username change with correct password', async function () {
      const response = await supertest(app)
        .put('/account/username')
        .send({ username: 'aragorn', password: 'elf4life' })

      assert.equal(response.status, 200, 'Response status should be 200')
      assert.equal(
        response.body.username,
        'aragorn',
        'Username should be aragorn'
      )
    })
  })
})
