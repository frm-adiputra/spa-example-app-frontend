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
      <v-spacer />
      <v-text-field
        filled
        rounded
        dense
        hide-details
        placeholder="Cari"
        clearable
        single-line
      ></v-text-field>
      <!-- <v-toolbar-title v-text="title" /> -->
      <v-spacer />
      <v-menu :close-on-content-click="true" offset-y>
        <template #activator="{ on, attrs }">
          <v-avatar v-bind="attrs" color="primary" size="32" v-on="on">
            <img
              v-if="profilePicture"
              :src="profilePicture"
              alt="profile picture"
              referrerpolicy="no-referrer"
            />
            <v-icon v-else dark dense>{{ mdiAccount }}</v-icon>
          </v-avatar>
        </template>
        <AccountMenu />
      </v-menu>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>{{ mdiMenu }}</v-icon>
      </v-btn> -->
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
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiApplication,
  mdiMinus,
  mdiMenu,
  mdiRepeat,
  mdiAccount,
} from '@mdi/js'

export default {
  name: 'DefaultLayout',
  data: () => {
    return {
      mdiChevronLeft,
      mdiChevronRight,
      mdiApplication,
      mdiMinus,
      mdiMenu,
      mdiRepeat,
      mdiAccount,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          title: 'Welcome',
          to: '/',
        },
        {
          title: 'Inspire',
          to: '/inspire',
        },
        {
          title: 'Bentuk',
          to: '/bentuk',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      menu: false,
    }
  },
  computed: {
    ...mapGetters('auth', {
      user: 'user',
    }),
    title() {
      return this.$route.meta.title || 'Untitled'
    },
    profilePicture() {
      if (this.user) {
        return this.user.profilePicture
      }
      return null
    },
  },
}
</script>
