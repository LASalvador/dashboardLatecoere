import http from './http'

const distinctLinha = () => {
  var endpoint = 'dlinha/'
  return http().get(endpoint)
}

export default {
  distinctLinha,
}
