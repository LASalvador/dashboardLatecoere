<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="3"
        lg="3"
        xl="3"
      >
        <v-row>
          <v-col cols="12">
            <v-card color="latecoereGray">
              <v-card-text>
                <img
                  v-if="path"
                  :src="path"
                  :alt="programa"
                  height="120"
                >
                <v-select
                  v-model="programa"
                  :items="linhas"
                  item-text="linha"
                  item-value="linha"
                  label="Selecione uma linha"
                  outlined
                  @change="atualizarLinha"
                  color="latecoereBlue"
                />
                <v-select
                  v-model="range"
                  :items="ranges"
                  item-text="range"
                  item-value="range"
                  label="Selecione um range"
                  outlined
                  @change="pegarDadosRange"
                  color="latecoereBlue"
                />
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
            v-for="(posto, index) in programas"
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

</style>
<script src="./ProgramaController.js"></script>
