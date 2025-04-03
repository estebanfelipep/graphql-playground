import { createAccount, createCategory, createTransaction } from '../db'
import {
  createAccountSchema,
  createCategorySchema,
  createTransactionSchema,
} from '../db/schemas'

import type {
  Account,
  Category,
  CreateAccount,
  CreateCategory,
  CreateTransaction,
  Transaction,
} from '../db/schemas'
import type { ZodType } from 'zod'

type EntityName = 'transaction' | 'category' | 'account'

type EntityTypes = {
  transaction: Transaction
  category: Category
  account: Account
}

type EntityCreationTypes = {
  transaction: CreateTransaction
  category: CreateCategory
  account: CreateAccount
}

type EntityData = {
  [E in EntityName]: {
    create: {
      schema: ZodType<EntityCreationTypes[E]>
      dbHandler: (data: EntityCreationTypes[E]) => any
      defaultValues: Partial<EntityCreationTypes[E]>
    }
  }
}
const entitiesData: EntityData = {
  transaction: {
    create: {
      schema: createTransactionSchema,
      dbHandler: createTransaction,
      defaultValues: {
        amount: 0,
        date: new Date().toISOString(),
      },
    },
  },
  category: {
    create: {
      schema: createCategorySchema,
      dbHandler: createCategory,
      defaultValues: {},
    },
  },
  account: {
    create: {
      schema: createAccountSchema,
      dbHandler: createAccount,
      defaultValues: {},
    },
  },
} as const

const entitiesHandler = {
  create: <T extends EntityName>(
    entityName: T,
    newEntityValues: object,
  ): EntityTypes[T] | never => {
    const { schema, dbHandler, defaultValues } = entitiesData[entityName].create

    const newEntity = {
      ...defaultValues,
      ...newEntityValues,
    }

    const { success, error, data: validData } = schema.safeParse(newEntity)

    if (!success) {
      throw new Error(`Invalid input: ${error}, trying to create ${entityName}`)
    }

    // Safe type assertion since zod guarantees the type
    const dbResult = dbHandler(validData as any)

    return {
      ...validData,
      id: Number(dbResult.lastInsertRowid),
    } as unknown as EntityTypes[T]
  },
}

export default entitiesHandler
