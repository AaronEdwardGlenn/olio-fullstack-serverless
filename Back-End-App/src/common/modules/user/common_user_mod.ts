import { Sitka, SitkaModule } from "olio-sitka"
import { call, select } from "redux-saga/effects"
import { AppModules } from "common/sitka"
import { core } from "core"
import { defaultUserState, UserState } from "common/modules/user/common_user_state"
import { User, UserCoreResponse } from "types"

export class UserModule extends SitkaModule<UserState, AppModules> {
  public moduleName = "user"

  constructor() {
    super()
  }

  public defaultState: UserState = defaultUserState

  public *handleCreateUser(user:User): {} {
    const {users} = yield select(this.getState)
    try {
      const newUser = yield call(core.user.createUser, user)
      newUser && users.unshift(newUser)
    } catch (e) {
      alert("Unable to create user")
      console.log(`Create User Error - ${e}`)
    } finally {
      this.handleGetAllUsers()
    }
  }

  public *handleGetUser(id: string): {} {
    const {users} = yield select(this.getState)
    try {
      const locatedUser = yield call(core.user.getUser, id)
      locatedUser && users.unshift(locatedUser)
      console.log("User Found:", locatedUser)
    } catch (e) {
      alert("Unable to locate user")
      console.log(`Get User Error - ${e}`)
    } finally {
      yield call(this.mergeState, {
        users
      })
    }
  }

  public *handleGetAllUsers(): {} {
    let allUsers: Array<UserCoreResponse>
    try {
      allUsers = yield select(core.user.getAllUsers)
    } catch (e) {
      alert("Unable to get all users")
      console.log(`Get All Users Error - ${e}`)
    } finally {
      if (allUsers.length > 0) {
        yield call(this.mergeState, {
          users: allUsers
        })
      }
    }
  }

  public *handleUpdateUser(user: UserCoreResponse): {} {
    try {
      yield call(core.user.updateUser, user)
    } catch (e) {
      alert("Unable to update user")
      console.log(`Update User Error - ${e}`)
    } finally {
      this.handleGetAllUsers()
    }
  }

  public *handleDeleteUser(id: string): {} {
    try {
      const removedUser = yield call(core.user.deleteUser, id)
      console.log("User Removed:", removedUser)
    } catch (e) {
      alert("Unable to delete user")
      console.log(`Delete User Error - ${e}`)
    } finally {
      this.handleGetAllUsers()
    }
  }
}
