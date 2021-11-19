import { UserCoreResponse } from "types"

export interface UserState {
  readonly users: UserCoreResponse[]
  readonly mocks: string
}

export const defaultUserState = {
  users: [],
  mocks: "mocks"
}