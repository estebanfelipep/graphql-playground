import db from '../db'
import { CreateTransaction, Transaction } from '../schemas'
import getSqlFields from './getSqlFields'

export { initDb } from '../init'

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

export const deleteTransaction = (id: number) => {
  const statement = db.prepare(`
    DELETE FROM transactions
    WHERE id = ?
  `)

  return statement.run(id)
}
