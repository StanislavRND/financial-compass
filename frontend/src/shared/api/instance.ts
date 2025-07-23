import axios from 'axios'

const axiosBase = axios.create({
  baseURL: 'https://financial-compass-5i55.onrender.com/api',
  withCredentials: true,
})

export default axiosBase
