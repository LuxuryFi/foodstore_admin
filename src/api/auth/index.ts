import { AuthInterfaces } from '../../interfaces/auth.interfaces'
import axiosClient from '../axios.config'

const authAPI = {
  async login(credentials: AuthInterfaces) {
    const url = '/internal/login'
    const response = await axiosClient.post(url, credentials)
    return response.data
  }
}

export default authAPI