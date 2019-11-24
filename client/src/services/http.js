import axios from 'axios'
// import { eventhub } from './eventhub.js'

const http = axios.create({
	baseURL: 'http://localhost:3102/'
})

// const _beforeRequest = (conf) => {
// 	eventhub.$emit('before-request')
// 	return conf
// }

// const _afterRequest = (conf) => {
// 	eventhub.$emit('after-request')
// 	return conf
// }

// const _onError = (error) => {
// 	eventhub.$emit('after-request')
// 	return error
// }

// // http.interceptors.request.use(_beforeRequest, _onError)
// http.interceptors.response.use(_afterRequest, _onError)

export default function () {
  return http
}
