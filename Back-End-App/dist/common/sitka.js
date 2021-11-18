"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const redux_saga_1 = require("redux-saga");
const olio_sitka_1 = require("olio-sitka");
const redux_1 = require("redux");
const common_user_mod_1 = require("common/modules/user/common_user_mod");
const sitka = new olio_sitka_1.Sitka({
    log: false,
    sitkaInState: false,
});
exports.sitka = sitka;
sitka.register([
    new common_user_mod_1.UserModule(),
]);
// create sitka
const sitkaMeta = sitka.createSitkaMeta();
const appReducer = redux_1.combineReducers(Object.assign({}, sitkaMeta.reducersToCombine));
function* sagaRoot() {
    yield effects_1.call(sitkaMeta.sagaRoot);
}
const sagaMiddleware = redux_saga_1.default();
const createStoreWithMiddleware = redux_1.compose(redux_1.applyMiddleware.apply(this, [sagaMiddleware, ...sitkaMeta.middleware]))(redux_1.createStore);
const store = createStoreWithMiddleware(appReducer, Object.assign({}, sitkaMeta.defaultState));
exports.store = store;
sagaMiddleware.run(sagaRoot);
sitka.setDispatch(store.dispatch);
//# sourceMappingURL=sitka.js.map