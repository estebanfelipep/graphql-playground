import { updateTransactionSchema } from '../db/schemas'
import entitiesHandler from './resolversHandler'

import { Resolvers } from '@/lib/codegen/__generated__/resolvers-types'
import {
  deleteTransaction,
  getAccounts,
  getCategories,
  getTransactionById,
  getTransactions,
  updateTransaction,
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
      const { transaction: newTransaction } = args

      return entitiesHandler.create('transaction', newTransaction)
    },
    updateTransaction: (parent, args) => {
      const { id, transaction: fieldsToUpdate } = args

      const {
        success,
        error,
        data: validData,
      } = updateTransactionSchema.safeParse(fieldsToUpdate)

      if (!success) {
        throw new Error(`Invalid input: ${error}`)
      }

      updateTransaction(id, validData)

      const updatedTransaction = getTransactionById(id)

      if (!updatedTransaction) {
        throw new Error(`Transaction with id ${id} not found`)
      }

      return updatedTransaction
    },
    deleteTransaction: (parent, args) => {
      const { id } = args

      deleteTransaction(id)

      return id
    },

    createCategory: (parent, args) => {
      const { category: newCategory } = args

      return entitiesHandler.create('category', newCategory)
    },
  },
}

export default resolvers
