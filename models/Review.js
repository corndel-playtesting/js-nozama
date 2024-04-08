import db from '../db/index.js'
import { ReviewPayload } from '../spec/schemas.js'
import { AppError } from '../server/errors.js'

class Review {
  static async findByProductId(productId) {
    if (isNaN(productId)) throw new Error('Invalid productId')

    const query = `SELECT * FROM reviews WHERE productId = ?`
    const results = await db.raw(query, [productId])

    if (!results.length) throw new AppError('No reviews found', 404)

    return results
  }

  static async productAverageRating(productId) {
    if (isNaN(productId)) throw new Error('Invalid productId')

    const query = `SELECT AVG(rating) as avg FROM reviews WHERE productId = ?`
    const [result] = await db.raw(query, [productId])
    return result.avg
  }

  static async create(review) {
    if (!ReviewPayload.safeParse(payload).success) {
      throw new AppError('Invalid product', 400)
    }

    const query = `INSERT INTO reviews (userId, productId, rating, reviewText) VALUES (?, ?, ?, ?) RETURNING *`
    const [result] = await db.raw(query, [
      review.userId,
      review.productId,
      review.rating,
      review.reviewText
    ])
    return result
  }
}

export default Review
