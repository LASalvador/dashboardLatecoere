import http from './http'

const distinctLinha = () => {
  var endpoint = 'dlinha/'
  return http().get(endpoint)
}

const getLinhaGroupByPosto = (programa) => {
  var endpoint = 'group/'
  return http().get(`${endpoint}${programa}`)
}

export default {
  distinctLinha,
  getLinhaGroupByPosto,
}
