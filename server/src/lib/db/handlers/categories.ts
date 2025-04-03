import db from '../db'
import { Category, CreateCategory } from '../schemas'
import getSqlFields from './getSqlFields'

export { initDb } from '../init'

export const getCategories = () => {
  const statement = db.prepare(`
    SELECT *
    FROM categories
  `)
  return statement.all() as Category[]
}

export const getCategoryById = (id: number) => {
  const statement = db.prepare(`
    SELECT *
    FROM categories
    WHERE id = ?
  `)
  const category = statement.get(id) as Category | undefined

  return category
}

export const createCategory = (category: CreateCategory) => {
  const fieldNames = getSqlFields({ format: 'names', fields: category })
  const fieldMapNames = getSqlFields({ format: 'mapName', fields: category })

  const statement = db.prepare(`
    INSERT INTO categories (${fieldNames})
    VALUES (${fieldMapNames})
  `)

  return statement.run(category)
}

export const updateCategory = (
  id: number,
  category: Partial<CreateCategory>,
) => {
  const fieldsMap = getSqlFields({
    format: 'map',
    fields: category,
  })

  const statement = db.prepare(`
    UPDATE categories
    SET ${fieldsMap}
    WHERE id = @id
  `)

  return statement.run({ ...category, id })
}
