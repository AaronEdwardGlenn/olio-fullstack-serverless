import { User, UserCoreResponse } from "types"
import { pickFromArray, randomNumber } from "utils"
import { v4 as uuid } from "uuid"

export class UserCoreMock {
  allUsers: Array<UserCoreResponse>

  constructor(count: number = 0) {
    for(let i = 0; i < count; i++) {
      this.allUsers.push(this.createUser(
        {
          firstName: `FirstName${i}`,
          lastName: `LastName${i}`,
          age: randomNumber(10, 100),
          favoriteColor: pickFromArray(["green", "blue", "black", "grey", "pink"]),
        }
      ))
    }
  }

  createUser = (user:User): UserCoreResponse => {
    return {
      id: uuid(),
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      favoriteColor: user.favoriteColor
    }
  }

  getUser = (id: string) => {
    return this.allUsers.map(x => x.id === id ? x : null)
  }

  getAllUsers = () => {
    return this.allUsers
  }

  updateUser = (updatedUser: UserCoreResponse) => {
    this.allUsers.map(x => 
      x.id === updatedUser.id 
      ? ({
      ...x, x: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        age: updatedUser.age,
        favoriteColor: updatedUser.favoriteColor 
        }
      }) 
      : x
    )
  }

  deleteUser = (id: string) => {
    const userToDelete = this.allUsers.find((x) => x.id === id)
    userToDelete && this.allUsers.filter((x)=> x.id !== id)
    return userToDelete
  }
}