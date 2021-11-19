import axios, { AxiosResponse } from "axios"
import { ApiDataType, User, UserCoreResponse } from "types"

const baseUrl: string = "https://292ikv2mt6.execute-api.us-west-2.amazonaws.com/prod"

export class UserCore {
  

  checkApiHealth = async () => {
    try {
      await axios.get(
        baseUrl + "/health", {
         headers: {
          "Access-Control-Allow-Origin": "Content-Type, Authorization",
         }
        }
      )
    } catch (error) {
      throw error
    }
  }

  getAllUsers = async () => {
    try {
      const users: AxiosResponse<ApiDataType> = await axios.get(
        baseUrl + "/users", {
        headers: {
          "Access-Control-Allow-Origin": "Content-Type, Authorization",
         }
        }
      )
      console.log(users.data.users);

      const results = users.data.users.map((x: any) => {
        return {
          id: x.userId,
          ...x
        }
      })
      
      return results
    } catch (error) {
      throw error
    }
  }
  getUser = async (    
    id: string
    ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const users: AxiosResponse<ApiDataType> = await axios.get(
        baseUrl + `/user/${id}`
      )
      return users
    } catch (error) {
      throw error
    }
  }

  createUser = async (
    formData: User
  ) => {
    try {
      const user = {
        "userId": 399,
        "firstName": formData.firstName,
        "lastName": formData.lastName,
        "age": formData.age,
        "favoriteColor": formData.favoriteColor
      }
      const saveUser: AxiosResponse<ApiDataType> = await axios.post(
        baseUrl + "/user",
        JSON.stringify(user), {
          headers: {
            'Content-Type' : 'application/json', 
            "Access-Control-Allow-Origin": "Content-Type, Authorization",
           }
        }
      )
      console.log(saveUser, "SAVED USER");
      
      // return saveUser
    } catch (error) {
      throw error
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
        `${baseUrl}/user/${user.id}`,
        userUpdate
      )
      return updatedUser
    } catch (error) {
      throw error
    }
  }

  deleteUser = async (
    id: string
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const deletedUser: AxiosResponse<ApiDataType> = await axios.delete(
        `${baseUrl}/user/${id}`
      )
      return deletedUser
    } catch (error) {
      throw error
    }
  }
}