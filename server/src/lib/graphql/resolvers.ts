import { getAccounts, getCategories, getTransactions } from '../db'

import { Resolvers } from '@/lib/codegen/__generated__/resolvers-types'

const resolvers: Resolvers = {
  Query: {
    transactions: () => {
      return getTransactions()
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
      console.log('log', parent)
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
}

export default resolvers
