import { Category } from '../../interfaces/category.interfaces'
import axiosClient from '../axios.config'

const categoryAPI = {
  addCategory(category: Category) {
    const url = '/categories'
    return axiosClient.post(url, category)
  },
  updateCategory(category: Category, id?: string) {
    if (id) {
      const url = `/categories/${id}`
      return axiosClient.put(url, { ...category
      })
    }
    return null
  },
  deleteCategory(id?: string) {
    if (id) {
      const url = `/categories/${id}`
      return axiosClient.delete(url)
    }
    return null
  },
  async getCategory(): Promise<Category[]> {
    const url = '/categories'
    try {
      const response = await axiosClient.get(url) // Or post if needed
      return response.data // Assuming the response data is an array of categorys
    } catch (error) {
      console.error('Error fetching categorys:', error)
      return [] // Return an empty array in case of an error
    }
  },
  async getOneCategory(id: unknown): Promise<Category | null> {
    const url = `/categories/${id}`
    try {
      const response = await axiosClient.get(url) // Or post if needed
      return response.data // Assuming the response data is an array of categorys
    } catch (error) {
      console.error('Error fetching categorys:', error)
      return null // Return an empty array in case of an error
    }
  }
}

export default categoryAPI
