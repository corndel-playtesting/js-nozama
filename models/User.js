// @ts-check
import db from '../db/index.js'

/**
 * @typedef {Object} UserBase
 * @property {string} username - The user's unique username.
 * @property {string} firstName - The user's first name.
 * @property {string} lastName - The user's last name.
 * @property {string} email - The user's email address.
 * @property {?string} avatar - The URL of the user's avatar image, which can be null.
 */

/**
 * The data required to create a new user.
 * @typedef {Object} Ext1
 * @property {string} password - The user's password. Ensure this is securely handled and stored.
 * @typedef {UserBase & Ext1} UserPayload
 */

/**
 * The information about a user which may be sent to clients. Does not include password.
 * @typedef {Object} Ext2
 * @property {string} id - The primary key identifier for the user.
 * @typedef {UserBase & Ext2} UserResponse
 */

class User {
  /**
   * @returns {Promise<UserResponse[]>}
   */
  static async findAll() {
    const query = 'select * from users'
    const results = await db.raw(query)
    return results
  }

  /**
   * @param {number} id
   * @returns {Promise<UserResponse>}
   */
  static async findById(id) {
    const query =
      'select id, username, firstName, lastName, email, avatar from users where id = ?'
    const results = await db.raw(query, [id])
    return results[0]
  }

  /**
   * @param {UserPayload} payload
   * @returns
   */
  static async create(payload) {
    const query = `
      insert into users
      (username, firstName, lastName, email, password, avatar)
      values (?, ?, ?, ?, ?, ?)
      returning id, username, firstName, lastName, email, avatar`
    const results = await db.raw(query, [
      payload.username,
      payload.firstName,
      payload.lastName,
      payload.email,
      payload.password,
      payload.avatar
    ])
    return results[0]
  }

  /**
   * @param {string} username
   * @param {string} password
   * @returns {Promise<UserResponse | false>}
   */
  static async logIn(username, password) {
    const query = `select id, username, firstName, lastName, email, avatar from users where username = ? and password = ?`
    const results = await db.raw(query, [username, password])
    return results[0] || false
  }

  static async delete(id) {
    const query = `delete from users where id = ? returning id, username, firstName, lastName, email, avatar`
    const results = await db.raw(query, [id])
    return results[0]
  }
}

export default User
