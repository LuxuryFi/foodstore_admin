import axiosClient from '../axios.config'

type Product = {
  id: number
  name: string
  // Add other properties as needed
}

const productAPI = {
  addProduct(product: Product) {
    const url = '/products/product'
    return axiosClient.post(url, product)
  },

  async getProduct(): Promise<Product[]> {
    const url = '/products/product'
    const response = await axiosClient.get(url) // or axiosClient.post if that's required
    return response.data // Extract the data array from the response
  }
}

export default productAPI
