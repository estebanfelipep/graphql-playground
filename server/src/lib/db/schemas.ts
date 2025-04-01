import { z } from 'zod'

// Category schema
export const categorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  description: z.string().optional(),
})

// Account schema
export const accountSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  isDefault: z.boolean(),
})

// Transaction schema
export const transactionSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().optional(),
  description: z.string().optional(),
  amount: z.number(),
  date: z.string(), // ISO date string format
  categoryId: z.number().int().positive(),
  accountId: z.number().int().positive(),
})

// Input schemas (for creating new records without ID)
export const createCategorySchema = categorySchema.omit({ id: true })
export const createAccountSchema = accountSchema.omit({ id: true })
export const createTransactionSchema = transactionSchema.omit({ id: true })

// Type definitions (can use instead of your current types)
export type Category = z.infer<typeof categorySchema>
export type Account = z.infer<typeof accountSchema>
export type Transaction = z.infer<typeof transactionSchema>

// Types for create operations
export type CreateCategory = z.infer<typeof createCategorySchema>
export type CreateAccount = z.infer<typeof createAccountSchema>
export type CreateTransaction = z.infer<typeof createTransactionSchema>
