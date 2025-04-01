import db from './db'
import { Account, Category, Transaction } from './types'

export { initDb } from './init'

export const getTransactions = () => {
  const statement = db.prepare(`
    SELECT *
    FROM transactions
  `)
  return statement.all() as Transaction[]
}

export const getAccounts = () => {
  const statement = db.prepare(`
    SELECT *
    FROM accounts
  `)
  return statement.all() as Account[]
}

export const getCategories = () => {
  const statement = db.prepare(`
    SELECT *
    FROM categories
  `)
  return statement.all() as Category[]
}

export const createTransaction = (transaction: Transaction) => {
  const statement = db.prepare(`
    INSERT INTO transactions (title, amount, date, categoryId, accountId)
    VALUES (@title, @amount, @date, @categoryId, @accountId)
  `)
  return statement.run(transaction)
}
