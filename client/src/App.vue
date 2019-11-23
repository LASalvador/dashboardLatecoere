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
            </template>
            <span>{{ item.text }} </span>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="latecoereGray"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Dashboard Latecoere</v-toolbar-title>
    </v-app-bar>

    <v-content>
         <router-view />
    </v-content>
    <v-footer
      color="latecoereGray"
      app
    >
      <span class="white--text">&copy; 2019</span>
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
          { text: 'Programa', icon: 'description', to:'/' },
          { text: 'Slider', icon: 'account_circle', to: '/Slider' }
      ],
    }),
  }
</script>