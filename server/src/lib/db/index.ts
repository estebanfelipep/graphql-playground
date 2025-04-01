import db from './db'
import { Account, Category, CreateTransaction, Transaction } from './schemas'

export { initDb } from './init'

export const getTransactions = () => {
  const statement = db.prepare(`
    SELECT *
    FROM transactions
  `)
  return statement.all() as Transaction[]
}

export const getTransactionById = (id: number) => {
  const statement = db.prepare(`
    SELECT *
    FROM transactions
    WHERE id = ?
  `)
  const transaction = statement.get(id) as Transaction | undefined

  return transaction
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

export const createTransaction = (transaction: CreateTransaction) => {
  const statement = db.prepare(`
    INSERT INTO transactions (title, description, amount, date, categoryId, accountId)
    VALUES (@title, @description, @amount, @date, @categoryId, @accountId)
  `)
  return statement.run(transaction)
}
