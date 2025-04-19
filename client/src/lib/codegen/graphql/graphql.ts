/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['Int']['output'];
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  transactions?: Maybe<Array<Maybe<Transaction>>>;
};

export type Category = {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  transactions?: Maybe<Array<Maybe<Transaction>>>;
};

export type CreateAccount = {
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type CreateCategory = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateTransaction = {
  accountId: Scalars['Int']['input'];
  amount?: InputMaybe<Scalars['Float']['input']>;
  categoryId: Scalars['Int']['input'];
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount?: Maybe<Account>;
  createCategory?: Maybe<Category>;
  createTransaction?: Maybe<Transaction>;
  deleteAccount?: Maybe<Account>;
  deleteCategory?: Maybe<Category>;
  deleteTransaction?: Maybe<Scalars['Int']['output']>;
  updateAccount?: Maybe<Account>;
  updateCategory?: Maybe<Category>;
  updateTransaction?: Maybe<Transaction>;
};


export type MutationCreateAccountArgs = {
  account?: InputMaybe<CreateAccount>;
};


export type MutationCreateCategoryArgs = {
  category: CreateCategory;
};


export type MutationCreateTransactionArgs = {
  transaction: CreateTransaction;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateAccountArgs = {
  account?: InputMaybe<UpdateAccount>;
  id: Scalars['Int']['input'];
};


export type MutationUpdateCategoryArgs = {
  category?: InputMaybe<UpdateCategory>;
  id: Scalars['Int']['input'];
};


export type MutationUpdateTransactionArgs = {
  id: Scalars['Int']['input'];
  transaction: UpdateTransaction;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accounts?: Maybe<Array<Maybe<Account>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  category?: Maybe<Category>;
  transaction?: Maybe<Transaction>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
};


export type QueryAccountArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTransactionArgs = {
  id: Scalars['Int']['input'];
};

export type Transaction = {
  __typename?: 'Transaction';
  account?: Maybe<Account>;
  accountId: Scalars['Int']['output'];
  amount: Scalars['Float']['output'];
  category?: Maybe<Category>;
  categoryId: Scalars['Int']['output'];
  date: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type UpdateAccount = {
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategory = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTransaction = {
  accountId?: InputMaybe<Scalars['Int']['input']>;
  amount?: InputMaybe<Scalars['Float']['input']>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type BookQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type BookQueryQuery = { __typename?: 'Query', transactions?: Array<{ __typename?: 'Transaction', id: number } | null> | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const BookQueryDocument = new TypedDocumentString(`
    query BookQuery {
  transactions {
    id
  }
}
    `) as unknown as TypedDocumentString<BookQueryQuery, BookQueryQueryVariables>;