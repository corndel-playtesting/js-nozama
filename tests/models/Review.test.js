import { describe, it, before, after } from 'mocha'
import assert from 'assert'
import Review from '../../models/Review.js'
import { ReviewResponse, ReviewsArray } from '../../spec/schemas.js'
import db from '../../db/index.js'

const testReview = {
  userId: 3,
  productId: 7,
  rating: 4,
  reviewText: 'This is a test review'
}

describe('The Review model', () => {
  describe('The Review.create method', () => {
    let newReview

    before(async () => {
      newReview = await Review.create(testReview)
    })

    after(async () => {
      await db.raw('DELETE FROM reviews WHERE id = ?', [newReview.id])
    })

    it('should return the new review', async () => {
      assert.strictEqual(newReview.reviewText, testReview.reviewText)
    })

    it('should create a new review in the database', async () => {
      const [review] = await db.raw('SELECT * FROM reviews WHERE id = ?', [
        newReview.id
      ])
      assert.strictEqual(review.reviewText, testReview.reviewText)
    })
  })

  describe('The Review.findByProductId method', () => {
    let reviews

    before(async () => {
      reviews = await Review.findByProductId(1)
    })

    it('should return an array of reviews', () => {
      try {
        ReviewsArray.parse(reviews)
      } catch (err) {
        assert.fail(err.message)
      }
    })
  })

  describe('The Review.productAverageRating method', () => {
    let averageRating

    before(async () => {
      averageRating = await Review.productAverageRating(1)
    })

    it('should return a number', () => {
      assert.strictEqual(typeof averageRating, 'number')
    })

    it('should return a number between 1 and 5', () => {
      assert(averageRating >= 1, true)
      assert(averageRating <= 5, true)
    })
  })
})
