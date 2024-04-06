import { describe, it, before, after } from 'mocha'
import { strictEqual as assert } from 'assert'
import Product from '../../models/Product.js'
import db from '../../db/index.js'

const testProduct = {
  name: 'Test Product',
  price: 100,
  description: 'This is a test product',
  stockQuantity: 10
}

describe('The Product model', function () {
  describe('The Product.findAll method', function () {
    let products

    before(async function () {
      products = await Product.findAll()
    })

    it('returns an array', async function () {
      assert(Array.isArray(products), true)
    })

    it('contains products', async function () {
      for (let key in testProduct) {
        assert(key in products[0], true)
      }
    })
  })

  describe('The Product.findById method', function () {
    let product

    before(async function () {
      product = await Product.findById(5)
    })

    it('returns an object and not an array', async function () {
      assert(typeof product, 'object')

      assert(Array.isArray(product), false)
    })

    it('returns the correct product', async function () {
      assert(product.id, 5)
    })
  })

  describe('The Product.create method', function () {
    let newProduct

    before(async function () {
      newProduct = await Product.create(testProduct)
    })

    after(async function () {
      db.raw('DELETE FROM products WHERE name = ?', testProduct.name)
    })

    it('returns an object and not an array', async function () {
      assert(typeof newProduct, 'object')
      assert(Array.isArray(newProduct), false)
    })

    it('assigns an id to the product', async function () {
      assert('id' in newProduct, true)
    })

    it('inserts the new product into the database', async function () {
      const product = await Product.findById(newProduct.id)
      assert(product.name, testProduct.name)
    })
  })

  describe('The Product.findByCategory method', function () {
    let products

    before(async function () {
      products = await Product.findByCategory(3)
    })

    it('returns an array', async function () {
      assert(Array.isArray(products), true)
    })

    it('contains products', async function () {
      for (let key in testProduct) {
        assert(key in products[0], true)
      }
    })
  })
})
