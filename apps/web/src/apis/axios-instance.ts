import axios from 'axios'

export type AxiosHeaders = {
   [header: string]: string | number | boolean | undefined | null
}

const axiosInstance = axios.create({
   baseURL: process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL,
})

export default axiosInstance
