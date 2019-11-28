import api from '../../services/api'
export default {
  name: 'Slider',
  data () {
    return {
      items: [],
      arquivo: '',
    }
  },
  beforeMount () {
    this.pegarDados()
  },
  beforeUpdate () {
    console.log('aaaaaaaa')
  },
  methods: {
    resolverCaminho (programa) {
        var base = '/images/programas/'

        if (programa === 'CF-1') {
          this.arquivo = 'CF-1.png'
        } else if (programa === 'CF-3') {
          this.arquivo = 'CF-3.png'
        } else if (programa === 'OW') {
          this.arquivo = 'OW.png'
        } else if (programa === 'Porta Bagag. Diant.E1' || programa === 'Porta Bagag. Diant.E2') {
          this.arquivo = 'Porta Bag Dian E1 e E2.png'
        } else if (programa === 'Porta Bagag. Tras.E1' || programa === 'Porta Bagag. Tras.E2') {
          this.arquivo = 'Porta Bag Tras E1 e E2.png'
        } else if (programa === 'Porta Pax Dian.') {
          this.arquivo = 'Porta Pax Dian.png'
        } else if (programa === 'Porta Pax Tras.') {
          this.arquivo = 'Porta Pax Tras.png'
        } else if (programa === 'Porta Serv. Dian.') {
          this.arquivo = 'Porta Serv Dian.png'
        } else if (programa === 'Porta Serv.Tras.') {
          this.arquivo = 'Porta Serv Tras.png'
        } else if (programa === 'Portas Legacy') {
          this.arquivo = 'ELP.png'
        } else {
          this.arquivo = 'aaa.png'
        }

        return base + this.arquivo
    },
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
        programa.path = this.resolverCaminho(programa.linha)
      })
      this.items = programas.data
    },
  },
}
