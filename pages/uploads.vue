<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" class="pb-13">
      <v-card>
        <v-file-input
          v-model="fileupload"
          show-size
          label="File input"
        ></v-file-input>
        <v-btn @click="doUpload">Upload</v-btn>
        <v-btn @click="doDownload">Download</v-btn>
        <v-list flat>
          <v-list-item-group active-class="">
            <template v-for="(item, index) in items">
              <v-list-item :key="item.id" @click.stop="showDetail(item.id)">
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
      <BentukCreateDialog v-model="createDialog" />
      <BentukEditDialog v-model="editDialog" :item-id="detailItemId" />
      <InfiniteLoading @infinite="infiniteHandler"></InfiniteLoading>
    </v-col>
    <v-fab-transition>
      <v-btn
        color="accent"
        fab
        dark
        bottom
        right
        fixed
        @click="createDialog = true"
      >
        <v-icon>{{ mdiPlus }}</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import { mdiPlus } from '@mdi/js'
import feathersClient from '~/plugins/feathers'

export default {
  name: 'UploadsPage',
  components: {
    InfiniteLoading,
  },
  meta: {
    title: 'Bentuk',
  },
  data: () => ({
    detailDialog: false,
    createDialog: false,
    editDialog: false,
    detailItemId: null,
    limit: 20,
    skip: 0,
    itemCount: 0,
    infiniteId: +new Date(),
    mdiPlus,
    myFiles: [],
    fileupload: null,
  }),
  async fetch() {
    try {
      const result = await this.findItems({
        query: { $limit: this.limit, $skip: this.skip },
      })
      this.skip = result.skip
      this.itemCount = result.total
    } catch (err) {
      this.$store.dispatch('snackbar/queue', {
        message: err.message || err,
      })
    }
  },
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
  methods: {
    ...mapActions('bentuk', { findItems: 'find' }),
    ...mapActions('bentuk', { getItem: 'get' }),
    showDetail(itemId) {
      this.detailItemId = itemId
      this.detailDialog = true
    },
    async doUpload() {
      const formData = new FormData()
      formData.append('uri', this.fileupload)
      const response = await fetch('http://localhost:3030/uploads', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('feathers-jwt'),
        },
      })
      const result = await response.json()
      console.log(result)
      alert('The file has been uploaded successfully.')
    },
    doDownload() {
      feathersClient
        .service('uploads')
        .get(
          // '98ea6e4f216f2fb4b69fff9b3a44842c38686ca685f3f55dc48c5d3fb1107be4.markdown'
          'c5f013ab41a89c4f7369c046a169d5a98fa451e4314e9699f8fdac6c36b67902.xlsx'
        )
        .then((resp) => {
          console.log(resp)
        })
    },
    infiniteHandler($state) {
      this.skip = this.skip + this.limit
      this.$fetch().then(() => {
        if (this.itemCount === this.items.length) {
          $state.complete()
        } else {
          $state.loaded()
        }
      })
    },
  },
}
</script>
