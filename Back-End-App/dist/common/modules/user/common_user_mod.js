"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const olio_sitka_1 = require("olio-sitka");
const effects_1 = require("redux-saga/effects");
const core_1 = require("core");
const common_user_state_1 = require("common/modules/user/common_user_state");
class UserModule extends olio_sitka_1.SitkaModule {
    constructor() {
        super();
        this.moduleName = "user";
        this.defaultState = common_user_state_1.defaultUserState;
    }
    *handleCreateUser(user) {
        const { users } = yield effects_1.select(this.getState);
        try {
            const newUser = yield effects_1.call(core_1.core.user.createUser, user);
            newUser && users.unshift(newUser);
        }
        catch (e) {
            alert("Unable to create user");
            console.log(`Create User Error - ${e}`);
        }
        finally {
            this.handleGetAllUsers();
        }
    }
    *handleGetUser(id) {
        const { users } = yield effects_1.select(this.getState);
        try {
            const locatedUser = yield effects_1.call(core_1.core.user.getUser, id);
            locatedUser && users.unshift(locatedUser);
            console.log("User Found:", locatedUser);
        }
        catch (e) {
            alert("Unable to locate user");
            console.log(`Get User Error - ${e}`);
        }
        finally {
            yield effects_1.call(this.mergeState, {
                users
            });
        }
    }
    *handleGetAllUsers() {
        let allUsers;
        try {
            allUsers = yield effects_1.select(core_1.core.user.getAllUsers);
        }
        catch (e) {
            alert("Unable to get all users");
            console.log(`Get All Users Error - ${e}`);
        }
        finally {
            if (allUsers.length > 0) {
                yield effects_1.call(this.mergeState, {
                    users: allUsers
                });
            }
        }
    }
    *handleUpdateUser(user) {
        try {
            yield effects_1.call(core_1.core.user.updateUser, user);
        }
        catch (e) {
            alert("Unable to update user");
            console.log(`Update User Error - ${e}`);
        }
        finally {
            this.handleGetAllUsers();
        }
    }
    *handleDeleteUser(id) {
        try {
            const removedUser = yield effects_1.call(core_1.core.user.deleteUser, id);
            console.log("User Removed:", removedUser);
        }
        catch (e) {
            alert("Unable to delete user");
            console.log(`Delete User Error - ${e}`);
        }
        finally {
            this.handleGetAllUsers();
        }
    }
}
exports.UserModule = UserModule;
//# sourceMappingURL=common_user_mod.js.map