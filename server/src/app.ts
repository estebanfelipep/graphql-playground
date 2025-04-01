import { readFileSync } from 'fs'
import { ApolloServer, BaseContext } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { getAccounts, getCategories, getTransactions, initDb } from '@/lib/db'
import resolvers from '@/lib/graphql/resolvers'

// Note: this uses a path relative to the project's
// root directory, which is the current working directory
// if the server is executed using `npm run`.
const typeDefs = readFileSync('./src/lib/codegen/schema.graphql', {
  encoding: 'utf-8',
})

const shouldInitDb = false
if (shouldInitDb) {
  console.log('Initializing database...')
  initDb()
  console.log('Database initialized!')
}

const transactions = getTransactions()
const accounts = getAccounts()
const categories = getCategories()
console.log({ transactions, accounts, categories })

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}`)
