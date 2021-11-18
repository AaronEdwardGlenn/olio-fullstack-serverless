import axios, { AxiosResponse } from "axios"
import { ApiDataType, User, UserCoreResponse } from "types"

const baseUrl: string = "http://localhost:4000"

export class UserCore {

  getUsers = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const users: AxiosResponse<ApiDataType> = await axios.get(
        baseUrl + "/users"
      )
      return users
    } catch (error) {
      throw new Error(error)
    }
  }

  addUser = async (
    formData: User
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const user: Omit<User, "id"> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        favoriteColor: formData.favoriteColor
      }
      const saveUser: AxiosResponse<ApiDataType> = await axios.post(
        baseUrl + "/add-user",
        user
      )
      return saveUser
    } catch (error) {
      throw new Error(error)
    }
  }

  updateUser = async (
    user: UserCoreResponse
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const userUpdate: Pick<UserCoreResponse, "age"> = {
        age: 100
      }
      const updatedUser: AxiosResponse<ApiDataType> = await axios.put(
        `${baseUrl}/edit-user/${user.id}`,
        userUpdate
      )
      return updatedUser
    } catch (error) {
      throw new Error(error)
    }
  }

  deleteUser = async (
    id: string
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const deletedUser: AxiosResponse<ApiDataType> = await axios.delete(
        `${baseUrl}/delete-user/${id}`
      )
      return deletedUser
    } catch (error) {
      throw new Error(error)
    }
  }
}