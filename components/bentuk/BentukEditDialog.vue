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
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="bentuk"
            label="Bentuk"
            :rules="bentukRules"
          ></v-text-field>
          <v-file-input
            ref="dokumen"
            v-model="dokumenFile"
            label="Dokumen"
            :loading="dokumenUploadLoading"
            @change="onDokumenChange"
            :rules="dokumenFileRules"
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
  name: 'BentukEdit',
  props: {
    itemId: { type: String, default: null },
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
        () => this.bentukError.pop() || true,
      ],
      bentukError: [],
      dokumenError: [],
      dokumenFile: new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      }),
      dokumenUploadLoading: false,
      dokumen: null,
      uploadsItem: null,
      dokumenFileRules: [
        (v) => !v || v.size < 1000000 || 'Maksimum file size is 1 MB',
        () => this.dokumenError.pop() || true,
      ],
    }
  },
  async fetch() {
    try {
      if (!this.itemId) {
        return null
      }
      const item = await this.getItem(this.itemId)
      this.bentuk = item.bentuk
      this.dokumen = item.dokumen
      if (this.dokumen) {
        const uploadsItem = await this.getUploadsItem(this.dokumen)
        const extension = this.dokumen.split('.').pop()
        this.dokumenFile = new File([''], `Dokumen.${extension}`, {
          type: uploadsItem.contentType,
        })
      } else {
        this.dokumenFile = null
      }
      // console.log(uploadsItem.contentType, uploadsItem.id, uploadsItem.size)
    } catch (err) {
      this.$store.dispatch('snackbar/queue', { message: err.message || err })
    }
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
    ...mapActions('uploads', { getUploadsItem: 'get' }),
    onModelUpdate(newVal) {
      this.$emit('input', newVal)
    },
    async save() {
      if (!this.valid) {
        return
      }
      try {
        await this.updateItem([
          this.itemId,
          { bentuk: this.bentuk.trim(), dokumen: this.dokumen },
          {},
        ])
        this.onModelUpdate(false)
      } catch (err) {
        if (err.className && err.className === 'bad-request') {
          this.bentukError = [err.errors.bentuk]
          this.dokumenError = [err.errors.dokumen]
          this.$refs.form.validate()
        }
        await this.$store.dispatch('snackbar/queue', {
          message: err.message || err,
        })
      }
    },
    async onDokumenChange() {
      if (!this.dokumenFile || !this.$refs.dokumen.validate()) {
        this.dokumen = null
        return
      }

      try {
        const result = await this.$utils.uploadFile(
          this.dokumenFile,
          (loading) => (this.dokumenUploadLoading = loading)
        )
        this.dokumen = result.id
      } catch (err) {
        await this.$store.dispatch('snackbar/queue', {
          message: err.message || err,
        })
      }
    },
  },
}
</script>
