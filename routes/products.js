import { Router } from 'express'
import Product from '../models/Product.js'
import Review from '../models/Review.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/reviews', async (req, res, next) => {
  try {
    const reviews = await Review.findByProductId(req.params.id)
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/category/:id', async (req, res, next) => {
  try {
    const products = await Product.findByCategory(req.params.id)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

export default router
