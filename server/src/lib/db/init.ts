import db from './db'

export const initDb = () => {
  createAccountsTable()
  createCategoriesTable()
  createTransactionsTable()
  createDefaultData()
}

const createAccountsTable = () => {
  // Create accounts table
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        isDefault BOOLEAN NOT NULL DEFAULT 0
     )
  `,
  ).run()

  // Add a trigger to ensure only one default account
  db.prepare(
    `
      CREATE TRIGGER IF NOT EXISTS ensure_single_default_account
      AFTER UPDATE OF isDefault ON accounts
      WHEN NEW.isDefault = 1
      BEGIN
          UPDATE accounts SET isDefault = 0 WHERE id != NEW.id;
      END;
      `,
  ).run()

  // Also trigger on insert
  db.prepare(
    `
      CREATE TRIGGER IF NOT EXISTS ensure_single_default_account_on_insert
      AFTER INSERT ON accounts
      WHEN NEW.isDefault = 1
      BEGIN
          UPDATE accounts SET isDefault = 0 WHERE id != NEW.id;
      END;
      `,
  ).run()
}

const createCategoriesTable = () => {
  // Create categories table
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT
     )
  `,
  ).run()
}

const createTransactionsTable = () => {
  // Create transactions table
  db.prepare(
    `
  CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      categoryId INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
      accountId INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE
   )
`,
  ).run()
}

const createDefaultData = () => {
  const currentAccounts = db.prepare(` SELECT * FROM accounts`).all()

  // If there are already accounts, then there's already data
  // and we don't need to create default data
  if (currentAccounts.length > 0) return

  // Create default categories
  db.prepare(
    `
  INSERT INTO categories (name, description)
  VALUES
    ('Food', 'All food expenses'),
    ('Transport', 'All transport expenses'),
    ('Salary', 'All salary incomes')
`,
  ).run()

  // Create default accounts
  db.prepare(
    `
  INSERT INTO accounts (name, isDefault)
  VALUES
    ('Bank account', 1),
    ('Cash', 0),
    ('Credit card', 0)
    `,
  ).run()

  // Create default transaction
  db.prepare(
    `
  INSERT INTO transactions (title, description, amount, date, categoryId, accountId)
  VALUES
    ('My first transaction', 'This is a test transaction', 100, '2023-10-01', 1, 1)
    `,
  ).run()
}
