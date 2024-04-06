// @ts-check
import db from '../db/index.js'

/**
 * The data required to create a new review.
 * @typedef {Object} ReviewPayload
 * @property {number} productId - The ID of the product being reviewed.
 * @property {number} userId - The ID of the user creating the review.
 * @property {number} rating - The rating given in the review, ranging from 1 to 5.
 * @property {string} reviewText - The text content of the review.
 */

/**
 * The information about a review which may be sent to clients.
 * @typedef {Object} Ext
 * @property {number} id - The primary key identifier for the review.
 * @property {string} reviewDate - The timestamp when the review was created.
 * @typedef {ReviewPayload & Ext} ReviewResponse
 */

class Review {
  /**
   * @param {number} productId
   * @returns {Promise<ReviewResponse[]>}
   */
  static async findByProductId(productId) {
    const query = `SELECT * FROM reviews WHERE productId = ?`
    const results = await db.raw(query, [productId])
    return results
  }

  /**
   * @param {number} productId
   * @returns {Promise<number>}
   */
  static async productAverageRating(productId) {
    const query = `SELECT AVG(rating) as avg FROM reviews WHERE productId = ?`
    const results = await db.raw(query, [productId])
    return results[0].avg
  }

  /**
   * @param {ReviewPayload} review
   * @returns {Promise<ReviewResponse>}
   */
  static async create(review) {
    const query = `INSERT INTO reviews (userId, productId, rating, reviewText) VALUES (?, ?, ?, ?) RETURNING *`
    const results = await db.raw(query, [
      review.userId,
      review.productId,
      review.rating,
      review.reviewText
    ])
    return results[0]
  }
}

export default Review
