import db from '../db'
import { Account, CreateAccount } from '../schemas'
import getSqlFields from './getSqlFields'

export { initDb } from '../init'

export const getAccounts = () => {
  const statement = db.prepare(`
    SELECT *
    FROM accounts
  `)
  return statement.all() as Account[]
}

export const getAccountById = (id: number) => {
  const statement = db.prepare(`
    SELECT *
    FROM accounts
    WHERE id = ?
  `)
  const account = statement.get(id) as Account | undefined

  return account
}

export const createAccount = (account: CreateAccount) => {
  const fieldNames = getSqlFields({ format: 'names', fields: account })
  const fieldMapNames = getSqlFields({ format: 'mapName', fields: account })

  const statement = db.prepare(`
    INSERT INTO accounts (${fieldNames})
    VALUES (${fieldMapNames})
  `)

  return statement.run(account)
}

export const updateAccount = (id: number, account: Partial<CreateAccount>) => {
  const fieldsMap = getSqlFields({
    format: 'map',
    fields: account,
  })

  const statement = db.prepare(`
    UPDATE accounts
    SET ${fieldsMap}
    WHERE id = @id
  `)

  return statement.run({ ...account, id })
}
