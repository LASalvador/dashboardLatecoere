import api from '../../services/api'
export default {
  name: 'Slider',
  data () {
    return {
      items: [],
      programas: [
        { path: '/images/programas/CF-1.png', title: 'CF-1' },
        { path: '/images/programas/CF-3.png', title: 'CF-3' },
        { path: '/images/programas/OW.png', title: 'OW' },
        { path: '/images/programas/Porta Bag Dian E1 e E2.png', title: 'Porta Bagag. Diant.E1' },
        { path: '/images/programas/Porta Bag Dian E1 e E2.png', title: 'Porta Bagag. Diant.E2' },
        { path: '/images/programas/Porta Bag Tras E1 e E2.png', title: 'Porta Bagag. Tras.E1' },
        { path: '/images/programas/Porta Bag Tras E1 e E2.png', title: 'Porta Bagag. Tras.E2' },
        { path: '/images/programas/Porta Pax Dian.png', title: 'Porta Pax Dian.' },
        { path: '/images/programas/Porta Pax Tras.png', title: 'Porta Pax Tras.' },
        { path: '/images/programas/Porta Serv Dian.png', title: 'Porta Serv. Dian.' },
        { path: '/images/programas/Porta Serv Tras.png', title: 'Porta Serv Tras' },
        { path: '/images/programas/Porta Serv Tras.png', title: 'Porta Serv Tras' },
        { path: '/images/programas/ELP.png', title: 'Portas Legacy' },
      ],
      pos: 0,
      dados: '',
      path: [],
      title: '',
      show: true,
    }
  },
  computed: {
    tamanho () {
      return this.programas.length
    },
  },
  created () {
    setInterval(this.atualizarDados, 10000)
  },
  beforeMount () {
    this.pegarDados()
    this.atualizarDados()
  },
  methods: {
    async pegarDados () {
      var programas = await api.distinctLinha()
      programas.data.forEach(async (programa) => {
        var progs = await api.getLinhaGroupByPosto(programa.linha)
        var programasTemp = []
        progs.data.forEach((posto) => {
          programasTemp.push({
            linha: posto.linha,
            posto: posto.posto,
            duracaoMediaReal: posto.avg_fimreal_inicioreal,
            duracaoMediaPlan: posto.avg_fimplan_inicioplan,
            somatorio: posto.sum_fimreal_fimplan,
          })
        })
        programa.dados = programasTemp
      })
      this.items = programas.data
    },
    atualizarDados () {
      this.show = false
      this.pos = (this.pos + 1) % this.tamanho
      this.show = true
    },
  },
}
