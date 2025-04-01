import db from './db'
import getSqlFields from './getSqlFields'
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

export const createTransaction = (transaction: CreateTransaction) => {
  const fieldNames = getSqlFields({ format: 'names', fields: transaction })
  const fieldMapNames = getSqlFields({ format: 'mapName', fields: transaction })

  const statement = db.prepare(`
    INSERT INTO transactions (${fieldNames})
    VALUES (${fieldMapNames})
  `)

  return statement.run(transaction)
}

export const updateTransaction = (
  id: number,
  transaction: Partial<CreateTransaction>,
) => {
  const fieldsMap = getSqlFields({
    format: 'map',
    fields: transaction,
  })

  const statement = db.prepare(`
    UPDATE transactions
    SET ${fieldsMap}
    WHERE id = @id
  `)

  return statement.run({ ...transaction, id })
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
