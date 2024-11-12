import { Banner } from '../../interfaces/banner.interfaces'
import axiosClient from '../axios.config'

const bannerAPI = {
  addBanner(banner: Banner) {
    const url = '/banners'
    return axiosClient.post(url, banner)
  },
  updateBanner(banner: Banner, id?: string) {
    if (id) {
      const url = `/banners/${id}`
      return axiosClient.put(url, { ...banner
      })
    }
    return null
  },
  deleteBanner(id?: string) {
    if (id) {
      const url = `/banners/${id}`
      return axiosClient.delete(url)
    }
    return null
  },
  async getBanner(): Promise<Banner[]> {
    const url = '/banners'
    try {
      const response = await axiosClient.get(url) // Or post if needed
      return response.data // Assuming the response data is an array of banners
    } catch (error) {
      console.error('Error fetching banners:', error)
      return [] // Return an empty array in case of an error
    }
  },
  async getOneBanner(id: unknown): Promise<Banner> {
    const url = `/banners/${id}`
    try {
      const response = await axiosClient.get(url) // Or post if needed
      return response.data // Assuming the response data is an array of banners
    } catch (error) {
      console.error('Error fetching banners:', error)
      return {} // Return an empty array in case of an error
    }
  }
}

export default bannerAPI
