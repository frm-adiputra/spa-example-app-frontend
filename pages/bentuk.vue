<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-list>
          <template v-for="(item, index) in items">
            <v-list-item :key="item.id">
              <v-list-item-content>
                <v-list-item-title>{{ item.bentuk }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BentukPage',
  meta: {
    title: 'Bentuk',
  },
  computed: {
    ...mapGetters('bentuk', {
      findItemsInStore: 'find',
    }),
    items() {
      return this.findItemsInStore({}).data
    },
  },
  created() {
    this.findItems()
  },
  methods: {
    ...mapActions('bentuk', { findItems: 'find' }),
  },
}
</script>
