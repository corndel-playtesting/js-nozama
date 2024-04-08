import db from '../db/index.js'
import { AppError } from '../server/errors.js'
import { ProductPayload } from '../spec/schemas.js'

class User {
  static async findAll() {
    const query = `
      select id, username, firstName, lastName, email, avatar 
      from users
    `
    const results = await db.raw(query)

    if (!results.length) throw new AppError('No users found', 404)

    return results
  }

  static async findById(id) {
    if (isNaN(id)) throw new AppError('Invalid id', 400)

    const query = `
      select id, username, firstName, lastName, email, avatar
      from users
      where id = ?
    `
    const [result] = await db.raw(query, [id])

    if (!result) throw new AppError('User not found', 404)

    return result
  }

  static async create(payload) {
    if (!ProductPayload.safeParse(payload).success) {
      throw new AppError('Invalid user', 400)
    }

    const query = `
      insert into users
      (username, firstName, lastName, email, password, avatar)
      values (?, ?, ?, ?, ?, ?)
      returning id, username, firstName, lastName, email, avatar
    `
    const [result] = await db.raw(query, [
      payload.username,
      payload.firstName,
      payload.lastName,
      payload.email,
      payload.password,
      payload.avatar
    ])
    return result
  }

  static async logIn(username, password) {
    if (!username || !password) {
      throw new AppError('Username and password are required', 400)
    }

    const query = `
      select id, username, firstName, lastName, email, avatar
      from users
      where username = ? and password = ?
    `
    const [result] = await db.raw(query, [username, password])

    if (!result) throw new AppError('Invalid username or password', 401)

    return result
  }

  static async delete(id) {
    if (isNaN(id)) throw new AppError('Invalid id', 400)

    const query = `
      delete from users
      where id = ?
      returning id, username, firstName, lastName, email, avatar
    `
    const [result] = await db.raw(query, [id])

    if (!result) throw new AppError('User not found', 404)

    return result
  }
}

export default User
