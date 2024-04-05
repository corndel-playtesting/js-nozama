import { describe, test } from 'mocha'
import assert from 'assert'
import User from '../models/User.js'

describe('The User model', function () {
  test('User.findById returns an object', async function () {
    const user = await User.findById(13)
    assert.strictEqual(typeof user, 'object', 'Method should return an object')
  })

  test('User.findById finds a user by their id', async function () {
    const user = await User.findById(13)
    assert.strictEqual(user.id, 13, 'User id should be 13')
  })

  test('User.findById does not return the user password', async function () {
    const user = await User.findById(13)
    assert.ok(
      !(password in user),
      'Password should not be included in the result'
    )
  })
})
