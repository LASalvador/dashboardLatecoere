<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="8"
        lg="8"
        xl="8"
      >
        <v-card>
          <v-card-title class="headline">
            Selecione as opções disponíveis:
          </v-card-title>
          <v-card-text color="latecoereGray">
            <div class="title">
              <span class="font-weight-bold">Modo TV</span>
              - Modo de slides para exibição em uma TV.
            </div>
            <div class="title">
              <span class="font-weight-bold">Modo PC</span>
              - Modo para exibição em um computador, com filtros de Range e programa.
            </div>
            <v-btn
              to="/programa"
              large
              color="latecoereBlueDark"
              class="white--text"
            >
              Modo PC
            </v-btn>
            &nbsp; &nbsp; &nbsp;
            <v-btn
              to="/slider"
              large
              color="latecoereBlueDark"
              class="white--text"
            >
              Modo TV
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>

</style>
<script src="./HomeController.js"> </script>
