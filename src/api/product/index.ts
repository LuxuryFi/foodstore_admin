import { Product } from '../../interfaces/product.interfaces'
import axiosClient from '../axios.config'

const productAPI = {
  addProduct(product: Product) {
    const url = '/products/product'
    return axiosClient.post(url, product)
  },
  async getProduct(): Promise<Product[]> {
    const url = '/products/product'
    try {
      const response = await axiosClient.get(url) // Or post if needed
      return response.data // Assuming the response data is an array of products
    } catch (error) {
      console.error('Error fetching products:', error)
      return [] // Return an empty array in case of an error
    }
  }
}

export default productAPI
