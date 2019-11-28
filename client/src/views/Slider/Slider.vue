<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
      >
        <v-sheet
          class="mx-auto"
          elevation="8"
          max-width="800"
        >
          <v-slide-group
            v-model="model"
            class="pa-4"
            center-active
            show-arrows
          >
            <v-slide-item
              v-for="(img, index) in imagens"
              :key="index"
              v-slot:default="{ active, toggle }"
            >
              <v-card
                :color="active ? 'latecoereBlueDark' : 'grey lighten-5'"
                class="ma-4"
                height="180"
                width="190"
                @click="toggle"
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <img
                    class="align-end"
                    height="150px"
                    :src="img.path"
                    :alt="img.title"
                  >
                  <v-scale-transition />
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
      <v-col
        v-for="(posto, index) in items"
        :key="index"
        cols="12"
        md="3"
        lg="3"
        xl="3"
      >
        <v-card
          outlined
          :color="posto.somatorio === 0 ? 'green darken-3' : posto.somatorio > 0 ? 'light-blue  darken-3' : 'red darken-3' "
          height="100"
        >
          <v-card-text class="white--text">
            <p class="subtitle-2">
            Posto: {{ posto.posto }}
            </p>
            <p class="body-2">Total: {{ posto.somatorio }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
</style>
<script src="./SliderController.js"></script>
