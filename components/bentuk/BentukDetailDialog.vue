<template>
  <v-dialog :value="value" max-width="400" @input="onModelUpdate">
    <v-card>
      <v-app-bar color="white" flat>
        <v-toolbar-title>Bentuk</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="onModelUpdate(false)">
          <v-icon>{{ icons.mdiClose }}</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card-text class="mt-5 ps-4">{{ item && item.bentuk }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warning" text @click="onModelUpdate(false)">
          <v-icon left>{{ icons.mdiDelete }}</v-icon> Hapus
        </v-btn>
        <v-btn color="info" text @click="requestEdit">
          <v-icon left>{{ icons.mdiPencil }}</v-icon> Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mdiPencil, mdiDelete, mdiClose } from '@mdi/js'

export default {
  name: 'BentukDetailDialog',
  props: {
    itemId: { type: String, default: null },
    value: { type: Boolean, default: false },
  },
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
    requestEdit() {
      this.onModelUpdate(false)
      this.$emit('requestEdit')
    },
    onModelUpdate(newVal) {
      this.$emit('input', newVal)
    },
  },
}
</script>
