import { initDb, getTransactions, getAccounts } from '@/lib/db'
import { ApolloServer, BaseContext } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { readFileSync } from 'fs'
import { Resolvers } from '@/lib/codegen/__generated__/resolvers-types'

// Note: this uses a path relative to the project's
// root directory, which is the current working directory
// if the server is executed using `npm run`.
const typeDefs = readFileSync('./lib/codegen/schema.graphql', {
  encoding: 'utf-8'
})

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

const resolvers: Resolvers = {
  Query: {
    books: () => {
      return [
        {
          title: 'The Awakening',
          author: 'Kate Chopin'
        }
      ]
    }
  }
}

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log(`🚀  Server ready at: ${url}`)
