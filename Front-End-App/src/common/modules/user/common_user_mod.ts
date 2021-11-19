import { Sitka, SitkaModule } from "olio-sitka"
import { call, select } from "redux-saga/effects"
import { AppModules } from "common/sitka"
import { core } from "core"
import {
  defaultUserState,
  UserState,
} from "common/modules/user/common_user_state"
import { User, UserCoreResponse } from "types"
import { UserCoreMock } from "core/modules/core_user_mocks"

const userCoreMock = new UserCoreMock(10)
export class UserModule extends SitkaModule<UserState, AppModules> {
  public moduleName = "user"

  public defaultState: UserState = defaultUserState

  public *handleSetMocks(mockState: string): {} {
    yield call(this.mergeState, {
      users: [],
      mocks: mockState,
    })
    const cool = yield select(this.getState)
    console.log("APP STATE IS", cool)
  }

  public *handleCreateUser(user: User): {} {
    const state: UserState = yield select(this.getState)
    let newUser: any
    try {
      // const newUser = yield call(core.user.createUser, user)
      state.mocks === "mocks"
        ? (newUser = userCoreMock.createUser(user))
        : (newUser = yield call(core.user.createUser, user))
      console.log(newUser, "NEW USER")
    } catch (e) {
      alert("Unable to create user")
      console.log(`Create User Error - ${e}`)
    } finally {
      yield call(this.mergeState, {
        users: [...state.users, newUser],
      })
      // this.handleGetAllUsers()
    }
  }

  public *handleCheckApiHealth(): {} {
    try {
      yield call(core.user.checkApiHealth)
    } 
    catch (e) {
      alert("UNABLE TO CONNECT TO AWS")
      console.log(`AWS Health Check Error - ${e}`)
    } 
    finally {
      alert("CONNECTED TO AWS")
    }
    }

  public *handleGetUser(id: string): {} {
    const state: UserState = yield select(this.getState)
    let locatedUser: any = userCoreMock.getUser(id)
    try {
      state.mocks === "mocks"
        ? (locatedUser = userCoreMock.getUser(id))
        : (locatedUser = yield call(core.user.getUser, id))

      console.log("User Found:", userCoreMock.getUser(id))
    } catch (e) {
      alert("Unable to locate user")
      console.log(`Get User Error - ${e}`)
    } finally {
      yield call(this.mergeState, {
        users: locatedUser,
      })
    }
  }

  public *handleGetAllUsers(): {} {
    console.log("GET");
    
    const state: UserState = yield select(this.getState)

    let allUsers: Array<UserCoreResponse>
    state.mocks === "mocks"
      ? (allUsers = userCoreMock.getAllUsers())
      : (allUsers = yield call(core.user.getAllUsers))

      console.log(allUsers, "ALL USERS");
      
      
    if (allUsers.length > 0) {
      yield call(this.mergeState, {
        users: [...state.users, ...allUsers],
      })
    }
  }

  public *handleUpdateUser(user: UserCoreResponse): {} {
    const state: UserState = yield select(this.getState)

    let usersUpdated
    try {
      state.mocks === "mocks"
        ? usersUpdated = userCoreMock.updateUser(user)
        : (usersUpdated = yield call(core.user.updateUser, user))
    } catch (e) {
      alert("Unable to update user")
      console.log(`Update User Error - ${e}`)
    } finally {
      yield call(this.mergeState, {
        users: usersUpdated,
      })
    }
  }

  public *handleDeleteUser(id: string): {} {
    const state: UserState = yield select(this.getState)
    let dataAfterRemovedUser
    try {
      state.mocks === "mocks"
        ? (dataAfterRemovedUser = userCoreMock.deleteUser(id))
        : (dataAfterRemovedUser = yield call(core.user.deleteUser, id))
      console.log("User Removed:", dataAfterRemovedUser)
    } catch (e) {
      alert("Unable to delete user")
      console.log(`Delete User Error - ${e}`)
    } finally {
      yield call(this.mergeState, {
        users: dataAfterRemovedUser,
      })    
    }
  }

  public *handleResetState(): {} {
    yield call(this.mergeState, {
      users: this.defaultState.users,
    })
  }
}
