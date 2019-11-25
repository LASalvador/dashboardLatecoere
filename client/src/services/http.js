import axios from 'axios'
// import { eventhub } from './eventhub.js'

const http = axios.create({
  baseURL: 'http://localhost:3102/',
})

export default function () {
  return http
}
