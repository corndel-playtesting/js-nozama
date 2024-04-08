import { describe, it } from 'mocha'
import assert from 'assert'
import User from '../../models/User.js'
import { UserResponse } from '../../spec/schemas.js'

describe('Day 1 Exercise 3', function () {
  describe('The User.findById method', function () {
    let user

    before(async function () {
      user = await User.findById(13)
    })

    it('returns a user', async function () {
      try {
        UserResponse.parse(user)
      } catch (err) {
        assert.fail(err.message)
      }
    })

    it('finds the user with the correct id', async function () {
      assert.strictEqual(user.id, 13)
    })

    it('does not return the user password', async function () {
      assert.strictEqual('password' in user, false)
    })
  })
})
