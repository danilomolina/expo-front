export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id?: string
  name?: string
  birtyDate?: string
  cellPhone?: string
  userId?: string
  planId?: string
  affiliatePlatformId?: string
  paidPlan?: boolean,
  cpf?: string,
  cep?: string,
  neighborhood?: string,
  street?: string,
  number?: string,
  complement?: string,
  image?: string,
  role?: string,
  city?: string,
  state?:string,
  email?: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
