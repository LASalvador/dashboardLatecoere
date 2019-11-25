<template>
  <v-container class="fluid">
    <v-row>
      <v-col
        v-for="(programa, index) in programas"
        :key="index"
        cols="12"
        md="3"
      >
        <card-image
          :programa="programa.linha"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>

</style>
<script src="./HomeController.js"> </script>
