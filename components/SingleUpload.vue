<template>
  <v-file-input
    :value="value"
    show-size
    label="File input"
    :loading="false"
    @input="onModelUpdate"
    @change="onChange"
  />
</template>

<script>
export default {
  name: 'SingleUpload',
  props: {
    value: { type: Object, default: null },
  },
  methods: {
    onModelUpdate(newVal) {
      this.$emit('input', newVal)
    },
    onChange(x) {
      // eslint-disable-next-line
      console.log('changed', x)
    },
  },
}
</script>
