<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
      >
        <v-list-item-action>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">
                {{ item.icon }}
              </v-icon>
            <span>{{ item.text }} </span>
            </template>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="latecoereGray"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <img 
        src="/images/logo-latecoere.png" 
        max-width="80"
        max-height="30"

      />
    </v-app-bar>

    <v-content>
         <router-view />
    </v-content>
    <v-footer
      color="latecoereGray"
      app
    >
      <span>&copy; 
       {{ (new Date()).getFullYear() }}
       <strong>Fatec São José dos Campos</strong></span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      items: [
          { text: 'Programa', icon: 'mdi-package-variant', to:'/' },
          { text: 'Slider', icon: 'mdi-timer-sand-full', to: '/Slider' }
      ],
    }),
  }
</script>