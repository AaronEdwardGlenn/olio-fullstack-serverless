export interface User {
  readonly firstName: string
  readonly lastName: string
  readonly age: number
  readonly favoriteColor: string 
}

export interface UserCoreResponse extends User {
  readonly id: string
}

export type ApiDataType = {
  message: string
  status: string
  users: UserCoreResponse[]
  user?: UserCoreResponse
}
