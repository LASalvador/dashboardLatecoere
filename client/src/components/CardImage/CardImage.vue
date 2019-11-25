<template>
  <v-card
    class="mx-auto"
    color="latecoereGray"
    :to="to"
  >
    <img
      height="150"
      width="200"
      :src="path"
    >
    <v-card-subtitle class="pb-0">
      Programa: {{ programa }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn
        color="latecoereBlueDark"
        text
        :to="to"
      >
        Visualizar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<style scoped>

</style>
<script>
  export default {
    name: 'CardImage',
    props: {
      programa: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
        arquivo: '',
      }
    },
    computed: {
      to () {
        return '/programa/' + this.programa
      },
      path () {
        return this.resolverCaminho()
      },
    },
    methods: {
      resolverCaminho () {
        var base = 'images/programas/'

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

        var caminho = base + this.arquivo

        return caminho
      },
    },
  }
</script>
