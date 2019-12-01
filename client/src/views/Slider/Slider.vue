<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        cols="12"
        md="3"
        lg="3"
        xl="3"
      >
        <transition
          name="fade"
          mode="out-in"
        >
          <v-card
            v-if="show"
            key="1"
          >
            <v-card-text>
              <img
                :src="programas[pos].path"
                :alt="programas[pos].title"
                height="120"
              />
              <div>{{ programas[pos].title }}</div>
            </v-card-text>
          </v-card>
          <div
            v-else
            key="2"
          ></div>
        </transition>
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
