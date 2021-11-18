import { User } from "types"

export interface UserState {
  readonly users: ReadonlyArray<User>
}

export const defaultUserState = {
  users: []
}