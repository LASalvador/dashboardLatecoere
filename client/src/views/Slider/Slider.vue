<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        cols="12"
        md="3"
        lg="3"
        xl="3"
      >
        <v-row>
          <v-col cols="12">
            <v-card
              key="1"
            >
              <v-card-text>
                <img
                  :src="programas[pos].path"
                  :alt="programas[pos].title"
                  height="120"
                >
                <div class="headline font-weight-black">{{ programas[pos].title }}</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card color="latecoereGray">
              <v-card-text>
                <div class="subtitle-2 font-weight-black">Legenda: </div>
                <div class="green darken-3 text-center">
                  <span class="font-weight-bold">Em Dia</span>
                </div>
                <div class="light-blue  darken-3 text-center">
                  <span class="font-weight-bold">Avançado</span>
                </div>
                <div class="red darken-3 text-center">
                  <span class="font-weight-bold">Atrasado</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="9"
        lg="9"
        xl="9"
      >
        <v-row dense>
          <v-col
            v-for="(posto, index) in items[pos].dados"
            :key="index"
            cols="2"
          >
            <v-card
              outlined
              :color="posto.somatorio === 0 ? 'green darken-3' : posto.somatorio > 0 ? 'light-blue  darken-3' : 'red darken-3' "
              height="115"
            >
              <v-card-text class="white--text">
                <span class="body-2">
                  {{ posto.posto }}
                </span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
<script src="./SliderController.js"></script>
