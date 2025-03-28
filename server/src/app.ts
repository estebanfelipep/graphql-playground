import { initDb, getTransactions, getAccounts } from '@/lib/db'

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
console.log('12222!!!', { transactions })

const accounts = getAccounts()
console.log({ accounts })
