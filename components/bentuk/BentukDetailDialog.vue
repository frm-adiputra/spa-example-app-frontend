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
      <v-list two-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ item && item.bentuk }}</v-list-item-title>
            <v-list-item-subtitle>Bentuk</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :href="dokumenLink">
          <v-list-item-content>
            <v-list-item-title>{{
              dokumenLink ? 'Dokumen' : 'Tidak ada'
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              dokumenLink ? 'Unduh' : 'Dokumen'
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action v-if="dokumenLink">
            <v-btn icon>
              <v-icon>{{ icons.mdiDownload }}</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warning" text @click="deleteDialog = true">
          <v-icon left>{{ icons.mdiDelete }}</v-icon> Hapus
        </v-btn>
        <v-btn color="info" text @click="requestEdit">
          <v-icon left>{{ icons.mdiPencil }}</v-icon> Edit
        </v-btn>
      </v-card-actions>
    </v-card>
    <DeleteDialog v-model="deleteDialog" @requestDelete="onRequestDelete" />
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mdiPencil, mdiDelete, mdiClose, mdiDownload } from '@mdi/js'

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
      mdiDownload,
    },
    deleteDialog: false,
  }),
  async fetch() {
    if (!this.itemId) {
      return null
    }
    await this.getItem(this.itemId)
  },
  computed: {
    ...mapGetters('bentuk', { getItemInStore: 'get' }),
    item() {
      if (!this.itemId) {
        return null
      }
      return this.getItemInStore(this.itemId)
    },
    dokumenLink() {
      if (!this.item || !this.item.dokumen) {
        return null
      }

      return `${this.$config.filesBaseURL}/${this.item.dokumen}`
    },
  },
  watch: {
    itemId: '$fetch',
  },
  methods: {
    ...mapActions('bentuk', { getItem: 'get' }),
    ...mapActions('bentuk', { removeItem: 'remove' }),
    ...mapActions('snackbar', { snackbar: 'queue' }),

    requestEdit() {
      this.onModelUpdate(false)
      this.$emit('requestEdit')
    },
    onRequestDelete() {
      this.removeItem(this.itemId)
        .then(() => {
          this.onModelUpdate(false)
        })
        .catch((err) => {
          this.snackbar({
            message: `${err.message}`,
            timeout: 6000,
          })
        })
    },
    onModelUpdate(newVal) {
      this.$emit('input', newVal)
    },
  },
}
</script>
