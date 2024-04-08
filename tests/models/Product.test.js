import { describe, it, before, after } from 'mocha'
import assert from 'assert'
import Product from '../../models/Product.js'
import { ProductResponse, ProductsArray } from '../../spec/schemas.js'
import db from '../../db/index.js'

const testProduct = {
  name: 'Test Product',
  price: 100,
  description: 'This is a test product',
  stockQuantity: 10,
  imageURL: 'https://via.placeholder.com/150'
}

describe('The Product model', function () {
  describe('The Product.findAll method', function () {
    let products

    before(async function () {
      products = await Product.findAll()
    })

    it('should return an array of products', async function () {
      try {
        ProductsArray.parse(products)
      } catch (error) {
        assert.fail(error.message)
      }
    })
  })

  describe('The Product.findById method', function () {
    let product

    before(async function () {
      product = await Product.findById(5)
    })

    it('should return a product', async function () {
      try {
        ProductResponse.parse(product)
      } catch (error) {
        assert.fail(error.message)
      }
    })
  })

  describe('The Product.create method', function () {
    let newProduct

    before(async function () {
      newProduct = await Product.create(testProduct)
    })

    after(async function () {
      await db.raw('DELETE FROM products WHERE name = ?', testProduct.name)
    })

    it('should return the product with an id', async function () {
      try {
        ProductResponse.parse(newProduct)
      } catch (error) {
        assert.fail(error.message)
      }
    })

    it('should insert the new product into the database', async function () {
      const product = await Product.findById(newProduct.id)
      assert.strictEqual(product.name, testProduct.name)
    })
  })

  describe('The Product.findByCategory method', function () {
    let products

    before(async function () {
      products = await Product.findByCategory(3)
    })

    it('should return an array of products', async function () {
      try {
        ProductsArray.parse(products)
      } catch (error) {
        assert.fail(error.message)
      }
    })
  })
})
