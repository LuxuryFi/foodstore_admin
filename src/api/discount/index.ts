import { Discount } from '../../interfaces/discount.interfaces'
import axiosClient from '../axios.config'

const discountAPI = {
  addDiscount(discount: Discount) {
    const url = '/discounts'
    return axiosClient.post(url, discount)
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
  }
}

export default discountAPI
