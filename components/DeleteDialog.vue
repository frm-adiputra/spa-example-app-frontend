<template>
  <v-dialog :value="value" max-width="290" @input="onModelUpdate">
    <v-card>
      <v-card-title> Hapus? </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warning" text @click="requestDelete">Hapus</v-btn>
        <v-btn text @click="onModelUpdate(false)">Batal</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteDialog',
  props: {
    value: { type: Boolean, default: false },
  },
  methods: {
    requestDelete() {
      this.onModelUpdate(false)
      this.$emit('requestDelete')
    },
    onModelUpdate(newVal) {
      this.$emit('input', newVal)
    },
  },
}
</script>
