import { call } from "redux-saga/effects"
import createSagaMiddleware from "redux-saga"
import { Sitka } from "olio-sitka"

import { applyMiddleware, createStore, compose, combineReducers } from "redux"
import { UserModule } from "common/modules/user/common_user_mod"
import { UserState } from "common/modules/user/common_user_state"

export interface AppModules {
  readonly user: UserModule
}

export interface AppState {
  readonly user: UserState
}

const sitka = new Sitka<AppModules>({
  log: false, // todo
  sitkaInState: false,
})

sitka.register([
  new UserModule(),
])

// create sitka
const sitkaMeta = sitka.createSitkaMeta()

const appReducer = combineReducers({
  ...sitkaMeta.reducersToCombine,
})

function* sagaRoot() {
  yield call(sitkaMeta.sagaRoot)
}

const sagaMiddleware = createSagaMiddleware()

const createStoreWithMiddleware = compose(applyMiddleware.apply(this, [sagaMiddleware, ...sitkaMeta.middleware]))(
  createStore,
)

const store = createStoreWithMiddleware(appReducer, {
  ...sitkaMeta.defaultState,
})
sagaMiddleware.run(sagaRoot)
sitka.setDispatch(store.dispatch)

export { store, sitka }