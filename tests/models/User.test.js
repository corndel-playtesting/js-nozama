// @ts-check
import { describe, it } from 'mocha'
import { strictEqual as assert } from 'assert'
import User from '../../models/User.js'
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
  describe('The User.findById method', function () {
    let user

    before(async function () {
      user = await User.findById(13)
    })

    it('returns a user', async function () {
      assert('username' in user, true)
      assert('email' in user, true)
    })

    it('finds the user with the correct id', async function () {
      assert(user.id, 13)
    })

    it('does not return the user password', async function () {
      assert('password' in user, false)
    })
  })

  describe('The User.create method', function () {
    let newUser

    before(async function () {
      newUser = await User.create(testUser)
    })

    after(async function () {
      await db.raw('DELETE FROM users WHERE username = ?;', testUser.username)
    })

    it('returns a user with an id', async function () {
      assert(typeof newUser.id, 'number')
    })

    it('inserts a new user into the database', async function () {
      const user = await User.findById(newUser.id)
      assert(user.username, 'testuser')
    })
  })

  describe('The User.logIn method', function () {
    before(async function () {
      await User.create(testUser)
    })

    after(async function () {
      await db.raw('DELETE FROM users WHERE username = ?;', testUser.username)
    })

    it('returns false if the password is incorrect', async function () {
      const user = await User.logIn('testuser', 'wrongpassword')
      assert(user, false)
    })

    it('returns a user if the password is correct', async function () {
      const user = await User.logIn('testuser', 'testpassword')
      assert(user && user.username, 'testuser')
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
      assert(Boolean(user), false)
    })
  })
})
