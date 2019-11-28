<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
      >
        <v-carousel
          height="1000"
          interval="100"
        >
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-row>
              <v-col
                cols="3"
              >
                <v-img
                  v-if="item.path"
                  :src="item.path"
                  :alt="item.linha"
                  max-height="200"
                />
              </v-col>
              <v-col
                v-for="(posto, index) in item.dados"
                :key="index"
                cols="3"
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
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
</style>
<script src="./SliderController.js"></script>
