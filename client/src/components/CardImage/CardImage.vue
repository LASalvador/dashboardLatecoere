<template>
	<v-card
    class="mx-auto"
    color="latecoereGray"
    to="/programa"
  >
    <v-img
      class="align-end"
      width="400"
      :src="path"
    >
    </v-img>
    <v-card-subtitle class="pb-0">Programa: {{ programa }}</v-card-subtitle>
    <v-card-actions>
      <v-btn
        color="latecoereBlueDark"
        text
        to="/programa"
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
      path: {
        type: String,
        required: true,
      }

    },
    data (){
      return {

      }
    },
    methods : {

    }
  }
</script>