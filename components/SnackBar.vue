<template>
  <v-snackbar :value="visible" :timeout="-1">
    {{ message }}
    <template #action="{ attrs }">
      <v-btn dark color="secondary" text v-bind="attrs" @click="doAction">
        {{ actionLabel }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  data() {
    return {}
  },
  computed: {
    message() {
      return this.$store.getters['snackbar/message']
    },
    visible() {
      return this.$store.getters['snackbar/visible']
    },
    actionLabel() {
      return this.$store.getters['snackbar/actionLabel']
    },
  },
  watch: {
    visible(val) {
      if (!val) {
        setTimeout(() => {
          this.$store.dispatch('snackbar/show')
        }, 500)
      }
    },
  },
  methods: {
    doAction() {
      this.$store.dispatch('snackbar/action')
    },
  },
}
</script>
