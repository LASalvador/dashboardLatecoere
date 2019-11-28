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
    </v-row>
  </v-container>
</template>
<style scoped>
</style>
<script src="./SliderController.js"></script>
