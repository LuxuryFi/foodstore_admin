import { User } from '../../interfaces/user.interfaces'
import axiosClient from '../axios.config'

const userAPI = {
  addUser(user: User) {
    const url = '/users'
    return axiosClient.post(url, user)
  },
  updateUser(user: User, id?: string) {
    if (id) {
      const url = `/users/${id}`
      return axiosClient.put(url, { ...user, image: 'test' })
    }
    return null
  },
  deleteUser(id?: string) {
    if (id) {
      const url = `/users/${id}`
      return axiosClient.delete(url)
    }
    return null
  },
  async getUser(): Promise<User[]> {
    const url = '/users'
    try {
      const response = await axiosClient.get(url) // Or post if needed
      return response.data // Assuming the response data is an array of users
    } catch (error) {
      console.error('Error fetching users:', error)
      return [] // Return an empty array in case of an error
    }
  },
  async getOneUser(id: unknown): Promise<User | null> {
    const url = `/users/${id}`
    try {
      const response = await axiosClient.get(url) // Or post if needed
      return response.data // Assuming the response data is an array of users
    } catch (error) {
      console.error('Error fetching users:', error)
      return null // Return an empty array in case of an error
    }
  }
}

export default userAPI
