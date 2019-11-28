<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col
        cols="12"
        md="4"
        lg="4"
        xl="4"
      >
        <img
          v-if="path"
          :src="path"
          :alt="programa"
          height="120"
        >
      </v-col>
      <v-col
        cols="12"
        md="8"
        lg="8"
        xl="8"
      >
        <v-card color="latecoereGray">
          <v-card-title>
            Programa: {{ programa }}
          </v-card-title>
          <v-card-subtitle>
            Dados sobre:
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="programa"
                  :items="linhas"
                  item-text="linha"
                  item-value="linha"
                  label="programas"
                  outlined
                  @change="atualizarLinha"
                />
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="range"
                :items="ranges"
                item-text="range"
                item-value="range"
                label="Ranges"
                outlined
                @change="pegarDadosRange"
              />
            </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(posto, index) in programas"
        :key="index"
        cols="12"
        md="3"
        lg="3"
        xl="3"
      >
        <v-card
          outlined
          :color="posto.somatorio === 0 ? 'green darken-3' : posto.somatorio > 0 ? 'light-blue  darken-3' : 'red darken-3' "
        >
          <v-card-subtitle>
            Posto: {{ posto.posto }}
          </v-card-subtitle>
          <v-card-text class="white--text">
            <p>Duração Média Plan: {{ posto.duracaoMediaPlan }}</p>
            <p>Duração Média Real: {{ posto.duracaoMediaReal }}</p>
            <p>Somatório: {{ posto.somatorio }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>

</style>
<script src="./ProgramaController.js"></script>
