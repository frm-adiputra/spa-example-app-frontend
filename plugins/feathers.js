import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import axios from 'axios'
// import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
// import io from 'socket.io-client'
// import { CookieStorage } from 'cookie-storage'
// import { iff, discard } from 'feathers-hooks-common'
import feathersVuex, { initAuth, hydrateApi } from 'feathers-vuex'
// const { iff, discard } = require('feathers-hooks-common')

// Get the api url from the environment variable
const apiUrl = process.env.API_URL
const restClient = rest(apiUrl)
const transport = restClient.axios(axios)
// const storage = new CookieStorage()
const storage = window.localStorage

const feathersClient = feathers()
  .configure(transport)
  .configure(auth({ storage }))
// .hooks({
//   before: {
//     all: [
//       iff(
//         (context) => ['create', 'update', 'patch'].includes(context.method),
//         discard('__id', '__isTemp')
//       ),
//     ],
//   },
// })

export default feathersClient

// Setting up feathers-vuex
const { makeServicePlugin, makeAuthPlugin, BaseModel, models, FeathersVuex } =
  feathersVuex(feathersClient, {
    serverAlias: 'api', // optional for working with multiple APIs (this is the default value)
    idField: '_id', // Must match the id field in your database table/collection
    whitelist: ['$regex', '$options'],
    enableEvents: process.client, // Prevent memory leak
  })

export {
  makeAuthPlugin,
  makeServicePlugin,
  BaseModel,
  models,
  FeathersVuex,
  initAuth,
  hydrateApi,
}
