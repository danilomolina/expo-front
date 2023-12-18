export type UserLogin = {
  email: string
  password: string
}

export type UserCreate = {
  email: string
  password: string
  planId: number
  username: string
}

export type UserUpdate = {
  email?: string
  password?: string
  planId?: number
  username?: string
}

export type UserGet = {
  planId: number
  username: string
  email: string,
  id: number
}

