export { initDb } from './init'
import db from './db'
import { Transaction } from './types'

export const getTransactions = () => {
  const statement = db.prepare(`
    SELECT *
    FROM transactions
  `)
  return statement.all()
}

export const getAccounts = () => {
  const statement = db.prepare(`
    SELECT *
    FROM accounts
  `)
  return statement.all()
}

export const createTransaction = (transaction: Transaction) => {
  const statement = db.prepare(`
    INSERT INTO transactions (title, amount, date, categoryId, accountId)
    VALUES (@title, @amount, @date, @categoryId, @accountId)
  `)
  return statement.run(transaction)
}
