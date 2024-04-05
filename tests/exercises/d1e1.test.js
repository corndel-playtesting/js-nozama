import { describe, test } from 'mocha'
import assert from 'assert'
import fs from 'fs'
import { fileURLToPath } from 'url'
import knex from 'knex'

const url = new URL('../../db/db.sqlite', import.meta.url)

const config = {
  client: 'sqlite3',
  connection: {
    filename: fileURLToPath(url)
  },
  useNullAsDefault: true
}

describe('Database connection', function () {
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
