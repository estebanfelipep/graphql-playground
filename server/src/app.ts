import { initDb, getTransactions, getAccounts } from './lib/db/index.js'

console.log('log 222221!1!')

setTimeout(() => {
  console.log('log 33333!')
}, 1000)

const shouldInitDb = false
if (shouldInitDb) {
  console.log('Initializing database...')
  initDb()
  console.log('Database initialized!')
}

const transactions = getTransactions()
console.log({ transactions })

const accounts = getAccounts()
console.log({ accounts })
