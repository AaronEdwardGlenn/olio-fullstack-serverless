"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("utils");
const uuid_1 = require("uuid");
class UserCore {
    constructor(count = 0) {
        this.createUser = (user) => {
            return {
                id: uuid_1.v4(),
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                favoriteColor: user.favoriteColor
            };
        };
        this.getUser = (id) => {
            return this.allUsers.map(x => x.id === id ? x : null);
        };
        this.getAllUsers = () => {
            return this.allUsers;
        };
        this.updateUser = (updatedUser) => {
            this.allUsers.map(x => x.id === updatedUser.id
                ? (Object.assign({}, x, { x: {
                        firstName: updatedUser.firstName,
                        lastName: updatedUser.lastName,
                        age: updatedUser.age,
                        favoriteColor: updatedUser.favoriteColor
                    } }))
                : x);
        };
        this.deleteUser = (id) => {
            const userToDelete = this.allUsers.find((x) => x.id === id);
            userToDelete && this.allUsers.filter((x) => x.id !== id);
            return userToDelete;
        };
        for (let i = 0; i < count; i++) {
            this.allUsers.push(this.createUser({
                firstName: `FirstName${i}`,
                lastName: `LastName${i}`,
                age: utils_1.randomNumber(10, 100),
                favoriteColor: utils_1.pickFromArray(["green", "blue", "black", "grey", "pink"]),
            }));
        }
    }
}
exports.UserCore = UserCore;
//# sourceMappingURL=core_user.js.map