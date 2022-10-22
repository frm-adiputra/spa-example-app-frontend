<template>
  <v-dialog :value="value" max-width="400" @input="onModelUpdate">
    <v-card>
      <v-app-bar color="white" flat>
        <v-toolbar-title>Tambah Bentuk</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="onModelUpdate(false)">
          <v-icon>{{ icons.mdiClose }}</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card-text class="mt-5 ps-4">
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="bentuk"
            label="Bentuk"
            :rules="bentukRules"
          ></v-text-field>
          <v-file-input
            v-model="dokumenFile"
            show-size
            label="Dokumen"
            :loading="dokumenUploadLoading"
            @change="onDokumenChange"
          ></v-file-input>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" text :disabled="!valid" @click="save">Simpan</v-btn>
        <v-btn text @click="onModelUpdate(false)">Batal</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable no-template-curly-in-string, no-console */

import { mapActions } from 'vuex'
import { mdiClose } from '@mdi/js'
import { string } from 'yup'

export default {
  name: 'BentukCreate',
  props: {
    value: { type: Boolean, default: false },
  },
  data() {
    return {
      icons: {
        mdiClose,
      },
      valid: false,
      bentuk: '',
      bentukRules: [
        this.$utils.yupRules(
          string()
            .trim()
            .required('Harus ngisi broo')
            .max(7, 'Maksimal ${max} karakter')
            .min(1, 'Minimal ${min} karakter')
        ),
      ],
      dokumenFile: null,
      dokumenUploadLoading: false,
      dokumen: null,
    }
  },
  watch: {
    value(val) {
      if (val) {
        if (this.$refs.form) {
          this.bentuk = ''
          this.dokumen = null
          this.dokumenFile = null
          this.dokumenUploadLoading = false
          this.$refs.form.resetValidation()
        }
      }
    },
  },
  methods: {
    ...mapActions('bentuk', { createItem: 'create' }),
    onModelUpdate(newVal) {
      this.$emit('input', newVal)
    },
    save() {
      if (!this.valid) {
        return
      }

      this.createItem({ bentuk: this.bentuk.trim(), dokumen: this.dokumen })
        .then(() => {
          this.onModelUpdate(false)
        })
        .catch((err) => {
          this.$store.dispatch('snackbar/queue', {
            message: err.message || err,
          })
        })
    },
    async onDokumenChange() {
      const result = await this.$utils.uploadFile(
        this.dokumenFile,
        (loading) => (this.dokumenUploadLoading = loading)
      )
      this.dokumen = result.id
    },
  },
}
</script>
