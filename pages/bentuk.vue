<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-list>
          <v-list-item-group>
            <template v-for="(item, index) in items">
              <v-list-item :key="item.id" @click="showDetail(item.id)">
                <v-list-item-content>
                  <v-list-item-title>{{ item.bentuk }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider
                v-if="index < items.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
      <BentukDetailDialog
        v-model="detailDialog"
        :item-id="detailItemId"
        @requestEdit="editDialog = true"
      />
      <BentukEditDialog v-model="editDialog" :item-id="detailItemId" />
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
  data: () => ({
    detailDialog: false,
    editDialog: false,
    detailItemId: null,
  }),
  computed: {
    ...mapGetters('bentuk', {
      findItemsInStore: 'find',
    }),
    items() {
      return this.findItemsInStore({}).data
    },
    itemDetail() {
      if (!this.currentItem) {
        return null
      }
      return this.getItem(this.currentItem)
    },
  },
  created() {
    this.findItems()
  },
  methods: {
    ...mapActions('bentuk', { findItems: 'find' }),
    ...mapActions('bentuk', { getItem: 'get' }),
    showDetail(itemId) {
      this.detailItemId = itemId
      this.detailDialog = true
    },
  },
}
</script>
