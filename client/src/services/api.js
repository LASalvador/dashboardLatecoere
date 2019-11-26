import http from './http'

const distinctLinha = () => {
  var endpoint = 'dlinha/'
  return http().get(endpoint)
}

const getLinhaGroupByPosto = (programa) => {
  var endpoint = 'group/'
  return http().get(`${endpoint}${programa}`)
}

const getDistinctRangeByLinha = (programa) => {
  var endpoint = 'drange/'
  return http().get(`${endpoint}${programa}`)
}

const getLinhaRangeGroupByPosto = (programa, range) => {
  var endpoint = 'group/'
  return http().get(`${endpoint}${programa}/${range}`)
}

export default {
  distinctLinha,
  getLinhaGroupByPosto,
  getDistinctRangeByLinha,
  getLinhaRangeGroupByPosto,
}
