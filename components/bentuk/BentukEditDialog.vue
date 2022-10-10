<template>
  <v-dialog :value="value" max-width="400" @input="onModelUpdate">
    <v-card>
      <v-app-bar color="white" flat>
        <v-toolbar-title>Edit Bentuk</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="onModelUpdate(false)">
          <v-icon>{{ icons.mdiClose }}</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card-text class="mt-5 ps-4">
        <v-form v-model="valid" ref="form">
          <v-text-field
            v-model="bentuk"
            label="Bentuk"
            :rules="bentukRules"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" text @click="save" :disabled="!valid">Simpan</v-btn>
        <v-btn text @click="onModelUpdate(false)">Batal</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable no-template-curly-in-string */

import { mapActions } from 'vuex'
import { mdiClose } from '@mdi/js'
import { string } from 'yup'

function yupRules(r) {
  return (v) => {
    try {
      r.validateSync(v)
      return true
    } catch (err) {
      return err.errors[0]
    }
  }
}

export default {
  name: 'BentukEdit',
  props: {
    itemId: { type: String, default: null },
    value: { type: Boolean, default: false },
  },
  data: () => ({
    icons: {
      mdiClose,
    },
    valid: false,
    bentuk: null,
    bentukRules: [
      yupRules(
        string()
          .trim()
          .required('Harus ngisi broo')
          .max(7, 'Maksimal ${max} karakter')
          .min(1, 'Minimal ${min} karakter')
      ),
    ],
  }),
  async fetch() {
    if (!this.itemId) {
      return null
    }
    const item = await this.getItem(this.itemId)
    this.bentuk = item.bentuk
  },
  watch: {
    value(val) {
      if (val) {
        this.$fetch()
      }
    },
  },
  methods: {
    ...mapActions('bentuk', { getItem: 'get' }),
    ...mapActions('bentuk', { updateItem: 'update' }),
    onModelUpdate(newVal) {
      this.$emit('input', newVal)
    },
    save() {
      this.updateItem([this.itemId, { bentuk: this.bentuk }, {}])
        .then(() => {
          this.onModelUpdate(false)
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
