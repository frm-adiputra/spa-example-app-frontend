<template>
  <v-card>
    <v-app-bar color="white" flat>
      <v-toolbar-title>Bentuk</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('requestClose')">
        <v-icon>{{ icons.mdiClose }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-card-text class="mt-5 ps-4">{{ item.bentuk }}</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text @click="dialog = false">
        <v-icon left>{{ icons.mdiPencil }}</v-icon> Edit
      </v-btn>

      <v-btn color="green darken-1" text @click="dialog = false">
        <v-icon left>{{ icons.mdiDelete }}</v-icon> Hapus
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mdiPencil, mdiDelete, mdiClose } from '@mdi/js'

export default {
  name: 'BentukDetail',
  props: { itemId: { type: String, default: null } },
  data: () => ({
    icons: {
      mdiPencil,
      mdiDelete,
      mdiClose,
    },
  }),
  async fetch() {
    if (!this.itemId) {
      return null
    }
    await this.getItem(this.itemId)
  },
  computed: {
    ...mapGetters('bentuk', {
      getItemInStore: 'get',
    }),
    item() {
      if (!this.itemId) {
        return null
      }
      return this.getItemInStore(this.itemId)
    },
  },
  watch: {
    itemId: '$fetch',
  },
  methods: {
    ...mapActions('bentuk', { getItem: 'get' }),
  },
}
</script>

<style>
.nuxt-logo {
  height: 180px;
}
</style>
