import { Order } from '../../interfaces/order.interfaces'
import axiosClient from '../axios.config'

const orderAPI = {
  addOrder(order: Order) {
    const url = '/orders'
    return axiosClient.post(url, order)
  },
  updateOrder(order: Order, id?: string) {
    if (id) {
      const url = `/orders/${id}`
      return axiosClient.put(url, { ...order
      })
    }
    return null
  },
  deleteOrder(id?: string) {
    if (id) {
      const url = `/orders/${id}`
      return axiosClient.delete(url)
    }
    return null
  },
  async getOrder(): Promise<Order[]> {
    const url = '/orders'
    try {
      const response = await axiosClient.get(url) // Or post if needed
      return response.data // Assuming the response data is an array of orders
    } catch (error) {
      console.error('Error fetching orders:', error)
      return [] // Return an empty array in case of an error
    }
  },
  async getOneOrder(id: unknown): Promise<Order> {
    const url = `/orders/${id}`
    console.log('url', url);
    try {
      const response = await axiosClient.get(url) // Or post if needed
      return response.data // Assuming the response data is an array of orders
    } catch (error) {
      console.error('Error fetching orders:', error)
      return {} // Return an empty array in case of an error
    }
  }
}

export default orderAPI
