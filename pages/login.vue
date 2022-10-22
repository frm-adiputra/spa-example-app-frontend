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
          <v-btn color="primary" :href="loginURL"> Login </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'blankCenter',
  computed: {
    loginURL() {
      return `${this.$config.apiURL}/oauth/google`
    },
  },
}
</script>
