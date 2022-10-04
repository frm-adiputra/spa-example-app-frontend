<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline"> Login </v-card-title>
        <v-card-text>
          <p>Please login</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" href="http://localhost:3030/oauth/google">
            Login
          </v-btn>
          <v-btn color="primary" @click="loginVuex"> Login via Vuex </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'LoginPage',

  methods: {
    loginVuex() {
      this.$store.dispatch('auth/authenticate', { strategy: 'google' })
    },
  },
}
</script>
