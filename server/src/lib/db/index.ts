export { initDb } from './init.js'
import db from './db.js'
import { Transaction } from './types.js'

export const getTransactions = () => {
  const stmt = db.prepare(`
    SELECT *
    FROM transactions
  `)
  return stmt.all()
}

export const getAccounts = () => {
  const stmt = db.prepare(`
    SELECT *
    FROM accounts
  `)
  return stmt.all()
}

export const createTransaction = (transaction: Transaction) => {
  const stmt = db.prepare(`
    INSERT INTO transactions (title, amount, date, categoryId, accountId)
    VALUES (@title, @amount, @date, @categoryId, @accountId)
  `)
  return stmt.run(transaction)
}
