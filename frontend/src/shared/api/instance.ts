import axios from 'axios'

const axiosBase = axios.create({
  baseURL: 'http://80.87.195.94:3000/api',
  withCredentials: true,
})

export default axiosBase
