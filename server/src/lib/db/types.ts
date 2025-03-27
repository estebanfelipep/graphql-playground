export type Category = {
  id: number
  name: string
  description: string | null
}

export type Account = {
  id: number
  name: string
  isDefault: boolean
}

export type Transaction = {
  id: number
  title: string
  amount: number
  date: string // ISO date string format
  categoryId: number
  accountId: number
}
