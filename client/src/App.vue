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
      >
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
        <strong>Fatec São José dos Campos</strong>
      </span>
    </v-footer>
    <v-overlay :value="loader.state">
      <v-progress-circular
        indeterminate
        size="64"
      />
    </v-overlay>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: {
        type: String,
        default: undefined,
      },
    },
    data: () => ({
      drawer: false,
      items: [
        { text: 'Início', icon: 'mdi-home', to: '/' },
        { text: 'Programa', icon: 'mdi-package-variant', to: '/programa' },
        { text: 'Slider', icon: 'mdi-timer-sand-full', to: '/Slider' },
      ],
      loader: {
        state: false,
      },
    }),
    created () {
      const vm = this
      this.$eventhub.$on('before-request', vm.activate)
      this.$eventhub.$on('after-request', vm.deactivate)
    },
    beforeDestroyed () {
      const vm = this
      this.$eventhub.$off('before-request', vm.activate)
      this.$eventhub.$off('after-request', vm.deactivate)
    },
    methods: {
      activate: function () {
        this.loader.state = true
      },
      deactivate: function () {
        this.loader.state = false
      },
    },
  }
</script>
