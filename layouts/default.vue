<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      class="indigo accent4"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      dark
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      color="white"
      elevate-on-scroll
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>{{ miniVariant ? mdiChevronRight : mdiChevronLeft }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>{{ mdiApplication }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>{{ mdiMinus }}</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="signOut">
        <v-icon>{{ mdiLogoutVariant }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>{{ mdiMenu }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> {{ mdiRepeat }} </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiApplication,
  mdiMinus,
  mdiMenu,
  mdiRepeat,
  mdiApps,
  mdiChartBubble,
  mdiLogoutVariant,
} from '@mdi/js'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      mdiChevronLeft,
      mdiChevronRight,
      mdiApplication,
      mdiMinus,
      mdiMenu,
      mdiRepeat,
      mdiLogoutVariant,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: mdiApps,
          title: 'Welcome',
          to: '/',
        },
        {
          icon: mdiChartBubble,
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },

  computed: {
    title() {
      return this.$route.meta.title || 'Untitled'
    },
  },

  methods: {
    async signOut() {
      await this.$store.dispatch('auth/logout')
      await localStorage.removeItem('feathers-jwt')
      this.$router.go('/login')
    },
  },
}
</script>
