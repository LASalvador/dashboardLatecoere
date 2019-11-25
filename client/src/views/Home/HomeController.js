import api from '../../services/api'
export default {
  name: 'Home',
  data () {
    return {
      titulo: 'Teste',
      path: 'images/programas/ELP.png',
      programas: [],
    }
  },
  async beforeMount () {
    var programas = await api.distinctLinha()
    this.programas = programas.data
  },
}
