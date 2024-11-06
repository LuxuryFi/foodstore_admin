import { Banner } from '../../interfaces/banner.interfaces'
import axiosClient from '../axios.config'

const bannerAPI = {
  addBanner(banner: Banner) {
    const url = '/banners'
    return axiosClient.post(url, banner)
  },

  async getBanner(): Promise<Banner[]> {
    const url = '/banners'
    const response = await axiosClient.get(url) // or axiosClient.post if that's required
    return response.data // Extract the data array from the response
  }
}

export default bannerAPI
