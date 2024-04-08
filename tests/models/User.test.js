import { describe, it } from 'mocha'
import assert from 'assert'
import User from '../../models/User.js'
import { UserResponse } from '../../spec/schemas.js'
import db from '../../db/index.js'

const testUser = {
  username: 'testuser',
  password: 'testpassword',
  firstName: 'Test',
  lastName: 'User',
  email: 'testuser@example.com',
  avatar: 'https://example.com/avatar.jpg'
}

describe('The User model', function () {
  describe('The User.create method', function () {
    let newUser

    before(async function () {
      newUser = await User.create(testUser)
    })

    after(async function () {
      await db.raw('DELETE FROM users WHERE username = ?;', testUser.username)
    })

    it('returns a user with an id', async function () {
      try {
        UserResponse.parse(newUser)
      } catch (err) {
        assert.fail(err.message)
      }
    })

    it('inserts a new user into the database', async function () {
      const user = await User.findById(newUser.id)
      assert.strictEqual(user.username, 'testuser')
    })
  })

  describe('The User.logIn method', function () {
    before(async function () {
      await User.create(testUser)
    })

    after(async function () {
      await db.raw('DELETE FROM users WHERE username = ?;', testUser.username)
    })

    it('throws an error if the password is incorrect', async function () {
      await assert.rejects(
        User.logIn('testuser', 'wrongpassword'),
        'Expected User.logIn to throw an error for wrong password'
      )
    })

    it('returns a user if the password is correct', async function () {
      const user = await User.logIn('testuser', 'testpassword')
      try {
        UserResponse.parse(user)
      } catch (err) {
        assert.fail(err.message)
      }
    })
  })

  describe('The User.delete method', function () {
    let newUser

    before(async function () {
      newUser = await User.create(testUser)
    })

    after(async function () {
      await db.raw('DELETE FROM users WHERE username = ?;', testUser.username)
    })

    it('deletes a user from the database', async function () {
      await User.delete(newUser.id)
      const user = await User.findById(newUser.id)
      assert.strictEqual(Boolean(user), false)
    })
  })
})
