import { Discount } from '../../interfaces/discount.interfaces'
import axiosClient from '../axios.config'

const discountAPI = {
  addDiscount(discount: Discount) {
    const url = '/discounts'
    return axiosClient.post(url, discount)
  },
  updateDiscount(discount: Discount, id?: string) {
    if (id) {
      const url = `/discounts/${id}`
      return axiosClient.put(url, { ...discount
      })
    }
    return null
  },
  deleteDiscount(id?: string) {
    if (id) {
      const url = `/discounts/${id}`
      return axiosClient.delete(url)
    }
    return null
  },
  async getDiscount(): Promise<Discount[]> {
    const url = '/discounts'
    try {
      const response = await axiosClient.get(url) // Or post if needed
      return response.data // Assuming the response data is an array of discounts
    } catch (error) {
      console.error('Error fetching discounts:', error)
      return [] // Return an empty array in case of an error
    }
  },
  async getOneDiscount(id: unknown): Promise<Discount> {
    const url = `/discounts/${id}`
    try {
      const response = await axiosClient.get(url) // Or post if needed
      return response.data // Assuming the response data is an array of discounts
    } catch (error) {
      console.error('Error fetching discounts:', error)
      return null // Return an empty array in case of an error
    }
  }
}

export default discountAPI
