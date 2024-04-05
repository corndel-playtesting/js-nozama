import { describe, test } from 'mocha'
import assert from 'assert'
import fs from 'fs'
import knex from 'knex'
import config from '../knexfile.js'

describe('Day 1 Exercise 1', function () {
  test('the db.sqlite file should exist in the db folder', function (done) {
    fs.access(config.connection.filename, fs.constants.F_OK, err => {
      if (err) {
        return done(new Error('File does not exist'))
      }
      done()
    })
  })

  test('the db.sqlite file should have a table named "users"', async function () {
    let db
    try {
      db = knex(config)
      const tableExists = await db.schema.hasTable('users')
      assert.strictEqual(tableExists, true)
    } finally {
      await db.destroy()
    }
  })

  test('the "users" table should contain some seed data', async function () {
    let db
    try {
      db = knex(config)
      const users = await db('users').select()
      assert.ok(users.length > 0, 'No users found in the "users" table')
    } finally {
      await db.destroy()
    }
  })
})
