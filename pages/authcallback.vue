<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline"> Auth Callback </v-card-title>
        <v-card-text>
          <p>Auth Callback</p>
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
// import client from '~/plugins/feathers-client'

export default {
  name: 'AuthCallbackPage',

  mounted() {
    // client.authentication
    //   .getAccessToken()
    //   .then((resp) => {
    //     console.log('access_token', resp)
    //   })
    //   .catch((e) => {
    //     console.error(e)
    //   })
    this.$store.dispatch('auth/authenticate')
  },

  methods: {
    loginVuex() {
      this.$store.dispatch('auth/authenticate', { strategy: 'google' })
      // client
      //   .reAuthenticate()
      //   .then(() => {
      //     console.log('reauthenticated')
      //   })
      //   .catch((e) => {
      //     console.error(e)
      //   })
    },
  },
}
</script>
