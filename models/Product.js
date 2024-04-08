import db from '../db/index.js'
import { ProductPayload } from '../spec/schemas.js'
import { AppError } from '../server/errors.js'

class Product {
  static async findAll() {
    const query = 'select * from products'
    const results = await db.raw(query)
    return results
  }

  static async findById(id) {
    if (isNaN(id)) throw new AppError('Invalid id', 400)

    const query = 'select * from products where id = ?'
    const [result] = await db.raw(query, [id])

    if (!result) throw new AppError('Product not found', 404)

    return result
  }

  static async create(payload) {
    if (!ProductPayload.safeParse(payload).success) {
      throw new AppError('Invalid product', 400)
    }

    const query =
      'insert into products (name, description, price, stockQuantity, imageURL) values (?, ?, ?, ?, ?) returning *'

    const [result] = await db.raw(query, [
      payload.name,
      payload.description,
      payload.price,
      payload.stockQuantity,
      payload.imageURL
    ])

    return result
  }

  static async findByCategory(categoryId) {
    if (isNaN(categoryId)) throw new AppError('Invalid category id', 400)

    const query = `
      select p.*
      from products p
      join product_categories pc on p.id = pc.productId
      join categories c on c.id = pc.categoryId
      where c.id = ?
    `
    const results = await db.raw(query, [categoryId])

    if (!results.length) throw new AppError('No products found', 404)

    return results
  }
}

export default Product
