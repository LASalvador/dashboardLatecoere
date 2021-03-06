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
    }
  },
  computed: {
    tamanho () {
      return this.programas.length
    },
  },
  created () {
     this.pegarDados()
  },
  mounted () {
    setInterval(this.atualizarDados, 10000)
  },
  methods: {
    async pegarDados () {
      var programas = await api.distinctLinha()
      for (let index = 0; index < programas.data.length; index++) {
        const programa = programas.data[index]
        var progs = await api.getLinhaGroupByPosto(programa.linha)
        var programasTemp = []
        for (let j = 0; j < progs.data.length; j++) {
          const posto = progs.data[j]
          programasTemp.push({
            linha: posto.linha,
            posto: posto.posto,
            duracaoMediaReal: posto.avg_fimreal_inicioreal,
            duracaoMediaPlan: posto.avg_fimplan_inicioplan,
            somatorio: posto.sum_fimreal_fimplan,
          })
        }
        programa.dados = programasTemp
      }
      this.items = programas.data
    },
    atualizarDados () {
      this.pos = (this.pos + 1) % this.tamanho
    },
  },
}
