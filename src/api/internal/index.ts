import { Internal } from '../../interfaces/internal.interfaces'
import axiosClient from '../axios.config'

const internalAPI = {
  addInternal(internal: Internal) {
    const url = '/internals'
    return axiosClient.post(url, internal)
  },
  updateInternal(internal: Internal, id?: string) {
    if (id) {
      const url = `/internals/${id}`
      return axiosClient.put(url, { ...internal, image: 'test' })
    }
    return null
  },
  deleteInternal(id?: string) {
    if (id) {
      const url = `/internals/${id}`
      return axiosClient.delete(url)
    }
    return null
  },
  async getInternal(): Promise<Internal[]> {
    const url = '/internals'
    try {
      const response = await axiosClient.get(url) // Or post if needed
      return response.data // Assuming the response data is an array of internals
    } catch (error) {
      console.error('Error fetching internals:', error)
      return [] // Return an empty array in case of an error
    }
  },
  async getOneInternal(id: unknown): Promise<Internal> {
    const url = `/internals/${id}`
    try {
      const response = await axiosClient.get(url) // Or post if needed
      return response.data // Assuming the response data is an array of internals
    } catch (error) {
      console.error('Error fetching internals:', error)
      return {} // Return an empty array in case of an error
    }
  }
}

export default internalAPI
