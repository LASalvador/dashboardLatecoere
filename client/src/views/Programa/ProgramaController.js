import api from '../../services/api'
export default {
  name: 'Programa',
  data () {
    return {
      titulo: 'Teste',
      path: 'images/programas/OW.png',
      programa: this.$route.params.id,
      programas: [],
      linhas: [],
      ranges: [],
    }
  },
  created () {
    this.resolverCaminho()
  },
  beforeMount () {
    this.pegarDadosLinha()
    this.pegarProgramas()
    this.pegarRanges()
  },
  methods: {
    resolverCaminho () {
        var base = '/images/programas/'

        if (this.programa === 'CF-1') {
          this.arquivo = 'CF-1.png'
        } else if (this.programa === 'CF-3') {
          this.arquivo = 'CF-3.png'
        } else if (this.programa === 'OW') {
          this.arquivo = 'OW.png'
        } else if (this.programa === 'Porta Bagag. Diant.E1' || this.programa === 'Porta Bagag. Diant.E2') {
          this.arquivo = 'Porta Bag Dian E1 e E2.png'
        } else if (this.programa === 'Porta Bagag. Tras.E1' || this.programa === 'Porta Bagag. Tras.E2') {
          this.arquivo = 'Porta Bag Tras E1 e E2.png'
        } else if (this.programa === 'Porta Pax Dian.') {
          this.arquivo = 'Porta Pax Dian.png'
        } else if (this.programa === 'Porta Pax Tras.') {
          this.arquivo = 'Porta Pax Tras.png'
        } else if (this.programa === 'Porta Serv. Dian.') {
          this.arquivo = 'Porta Serv Dian.png'
        } else if (this.programa === 'Porta Serv.Tras.') {
          this.arquivo = 'Porta Serv Tras.png'
        } else if (this.programa === 'Portas Legacy') {
          this.arquivo = 'ELP.png'
        } else {
          this.arquivo = 'aaa.png'
        }

        this.path = base + this.arquivo
      },
      async pegarDadosLinha () {
        var programas = await api.getLinhaGroupByPosto(this.programa)
        var programasTemp = []
        programas.data.forEach((posto) => {
          programasTemp.push({
            linha: posto.linha,
            posto: posto.posto,
            duracaoMediaReal: posto.avg_fimreal_inicioreal,
            duracaoMediaPlan: posto.avg_fimplan_inicioplan,
            somatorio: posto.sum_fimreal_fimplan,
          })
        })
        this.programas = programasTemp
      },
      async pegarProgramas () {
         var programas = await api.distinctLinha()
         this.linhas = programas.data
      },
      async pegarRanges () {
        var ranges = await api.getDistinctRangeByLinha(this.programa)
        this.ranges = ranges.data
      },
      atualizarLinha () {
        this.resolverCaminho()
        this.pegarDadosLinha()
      },
  },
}
