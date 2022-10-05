<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script>
import feathersClient from '~/plugins/feathers'

export default {
  name: 'InspirePage',
  meta: {
    title: 'Inspire',
  },
  created() {
    feathersClient
      .service('mata-kuliahs')
      .find()
      .then((resp) => {
        // console.log(resp)
      })
  },
}
</script>
