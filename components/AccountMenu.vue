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
          <v-list-item-subtitle>{{
            roleNames.join(', ')
          }}</v-list-item-subtitle>
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
import { mapGetters, mapActions } from 'vuex'
import { mdiLogoutVariant } from '@mdi/js'

export default {
  name: 'AccountMenu',
  data: () => ({
    mdiLogoutVariant,
  }),
  async fetch() {
    if (!this.user) {
      return
    }
    await this.findRoles({ query: { email: this.user.email } })
  },
  computed: {
    ...mapGetters('auth', {
      user: 'user',
    }),
    ...mapGetters('user-roles', {
      findRolesInStore: 'find',
    }),
    profilePicture() {
      if (this.user) {
        return this.user.profilePicture
      }
      return null
    },
    roles() {
      if (this.user) {
        return this.findRolesInStore({
          query: { email: this.user.email },
        }).data.map(({ role }) => role)
      }
      return null
    },
    roleNames() {
      if (!this.roles) {
        return []
      }

      return this.roles.map((x) => {
        switch (x) {
          case 'ADMIN_UNIV':
            return 'Admin Universitas'
          case 'ADMIN_FAKULTAS':
            return 'Admin Fakultas'
          case 'ADMIN_PRODI':
            return 'Admin Prodi'
          case 'MANAJER_UNIV':
            return 'Manajer Universitas'
          case 'MANAJER_FAKULTAS':
            return 'Manajer Fakultas'
          case 'MANAJER_PRODI':
            return 'Manajer Prodi'
          default:
            return 'Unauthorized'
        }
      })
    },
  },
  watch: {
    user: '$fetch',
  },
  methods: {
    ...mapActions('user-roles', { findRoles: 'find' }),
    async signOut() {
      try {
        await this.$store.dispatch('auth/logout')
      } catch (err) {
        // eslint-disable-next-line
        // console.error(err)
      }
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
