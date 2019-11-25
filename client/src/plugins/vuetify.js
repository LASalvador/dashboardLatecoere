import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#4caf50',
        secondary: '#4caf50',
        tertiary: '#495057',
        accent: '#82B1FF',
        error: '#f55a4e',
        info: '#00d3ee',
        success: '#5cb860',
        warning: '#ffa21a',
        latecoereGray: '#e8e8e8',
        latecoereOrange: '#d17321',
        latecoereBlueDark: '#244a6d',
        latecoereBlueLight: '#7da5c6',
        latecoereBlue: '#5b81a5',
      },
    },
  },
})
