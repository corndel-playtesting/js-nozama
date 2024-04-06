// @ts-check
import db from '../db/index.js'

/**
 * The data required to create a new product.
 * @typedef {Object} ProductPayload
 * @property {string} name - The name of the product.
 * @property {string} description - The description of the product.
 * @property {number} price - The price of the product.
 * @property {number} stockQuantity - The quantity of the product in stock.
 * @property {?string} imageURL - The URL of the product image.
 */

/**
 * The information about a product which may be sent to clients.
 * @typedef {Object} Ext
 * @property {string} id - The primary key identifier for the product.
 * @typedef {ProductPayload & Ext} ProductResponse
 */

class Product {
  /**
   * @returns {Promise<ProductResponse[]>}
   */
  static async findAll() {
    const query = 'select * from products'
    const results = await db.raw(query)
    return results
  }

  /**
   * @param {number} id - The ID of the product
   * @returns {Promise<ProductResponse>}
   */
  static async findById(id) {
    const query = 'select * from products where id = ?'
    const results = await db.raw(query, [id])
    return results[0]
  }

  /**
   * @param {ProductPayload} payload
   * @returns {Promise<ProductResponse>}
   */
  static async create(payload) {
    const query =
      'insert into products (name, description, price, stockQuantity, imageURL) values (?, ?, ?, ?, ?) returning *'
    const results = await db.raw(query, [
      payload.name,
      payload.description,
      payload.price,
      payload.stockQuantity,
      payload.imageURL
    ])
    return results[0]
  }

  /**
   * @param {number} categoryId - The ID of the category
   * @returns {Promise<ProductResponse[]>}
   */
  static async findByCategory(categoryId) {
    const query = `
      select p.*, c.id
      from products p
      join product_categories pc on p.id = pc.productId
      join categories c on c.id = pc.categoryId
      where c.id = ?
    `
    const results = await db.raw(query, [categoryId])
    return results
  }
}

export default Product
