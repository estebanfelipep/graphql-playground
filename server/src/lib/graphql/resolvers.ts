import { createTransactionSchema } from '../db/schemas'

import { Resolvers } from '@/lib/codegen/__generated__/resolvers-types'
import {
  createTransaction,
  getAccounts,
  getCategories,
  getTransactionById,
  getTransactions,
} from '@/lib/db'

const resolvers: Resolvers = {
  Query: {
    transactions: () => {
      return getTransactions()
    },
    transaction: (parent, args) => {
      const { id } = args
      const transaction = getTransactionById(id)

      if (!transaction) {
        throw new Error(`Transaction with id ${id} not found`)
      }

      return transaction
    },
    categories: () => {
      return getCategories()
    },
    accounts: () => {
      return getAccounts()
    },
  },
  Transaction: {
    category: (parent) => {
      const { categoryId } = parent

      const category = getCategories().find(
        (category) => category.id === categoryId,
      )

      return category ? category : null
    },

    account: (parent) => {
      const { accountId } = parent

      const account = getAccounts().find((account) => account.id === accountId)

      return account ? account : null
    },
  },

  Category: {
    transactions: (parent) => {
      const { id: categoryId } = parent

      const transactions = getTransactions().filter(
        (transaction) => transaction.categoryId === categoryId,
      )

      return transactions.length > 0 ? transactions : null
    },
  },

  Account: {
    transactions: (parent) => {
      const { id: accountId } = parent

      const transactions = getTransactions().filter(
        (transaction) => transaction.accountId === accountId,
      )

      return transactions.length > 0 ? transactions : null
    },
  },
  Mutation: {
    createTransaction: (parent, args) => {
      const { title, amount, date, description, categoryId, accountId } =
        args.transaction

      const newTransaction = {
        title,
        description,
        amount: amount ? amount : 0,
        date: date ? new Date(date) : new Date().toISOString(),
        categoryId,
        accountId,
      }

      const {
        success,
        error,
        data: validData,
      } = createTransactionSchema.safeParse(newTransaction)

      if (!success) {
        throw new Error(`Invalid input: ${error}`)
      }

      const dbResult = createTransaction(validData)

      return {
        ...validData,
        id: Number(dbResult.lastInsertRowid),
      }
    },
  },
}

export default resolvers
