import db from './db.js'

export const initDb = () => {
  // Create categories table
  db.prepare(
    `
  CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
   )
`
  ).run()

  // Create accounts table
  db.prepare(
    `
  CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      isDefault BOOLEAN NOT NULL DEFAULT 0
   )
`
  ).run()

  // Create transactions table
  db.prepare(
    `
  CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      categoryId INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
      accountId INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE
   )
`
  ).run()

  // Create default categories
  db.prepare(
    `
  INSERT INTO categories (name, description)
  VALUES
    ('Food', 'All food expenses'),
    ('Transport', 'All transport expenses'),
    ('Salary', 'All salary incomes')
`
  ).run()

  // Create default accounts
  db.prepare(
    `
  INSERT INTO accounts (name, isDefault)
  VALUES
    ('Cash', 1),
    ('Card', 0)
`
  ).run()
}
