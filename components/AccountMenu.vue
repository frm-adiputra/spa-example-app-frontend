<template>
  <v-card>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <img
            :src="profilePicture"
            alt="profile picture"
            referrerpolicy="no-referrer"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user && user.name }}</v-list-item-title>
          <v-list-item-subtitle>Roles</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <!-- <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
            <v-icon>mdi-heart</v-icon>
          </v-btn> -->
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="signOut">
        <v-icon left>{{ mdiLogoutVariant }}</v-icon> Sign out
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { mdiLogoutVariant } from '@mdi/js'

export default {
  name: 'AccountMenu',
  data: () => ({
    mdiLogoutVariant,
  }),
  computed: {
    ...mapGetters('auth', {
      user: 'user',
    }),
    profilePicture() {
      if (this.user) {
        return this.user.profilePicture
      }
      return null
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

<style>
.nuxt-logo {
  height: 180px;
}
</style>
