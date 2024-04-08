import { z } from 'zod'

export const ProductPayload = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stockQuantity: z.number(),
  imgURL: z.string().optional()
})

export const ProductResponse = ProductPayload.extend({
  id: z.number()
})

export const ProductsArray = z.array(ProductResponse)

export const UserPayload = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  password: z.string()
})

export const UserResponse = UserPayload.extend({ id: z.number() }).omit({
  password: true
})

export const ReviewPayload = z.object({
  productId: z.number(),
  userId: z.number(),
  rating: z.number(),
  reviewText: z.string()
})

export const ReviewResponse = ReviewPayload.extend({
  id: z.number(),
  reviewDate: z.string()
})

export const ReviewsArray = z.array(ReviewResponse)
