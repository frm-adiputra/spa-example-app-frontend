import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import axios from 'axios'
import auth from '@feathersjs/authentication-client'
import feathersVuex, { initAuth, hydrateApi } from 'feathers-vuex'

// Get the api url from the environment variable
const apiUrl = process.env.API_URL
const restClient = rest(apiUrl)
const transport = restClient.axios(axios)
const storage = window.localStorage

const feathersClient = feathers()
  .configure(transport)
  .configure(auth({ storage }))

export default feathersClient

// Setting up feathers-vuex
const { makeServicePlugin, makeAuthPlugin, BaseModel, models, FeathersVuex } =
  feathersVuex(feathersClient, {
    // serverAlias: 'api', // optional for working with multiple APIs (this is the default value)
    idField: 'id', // Must match the id field in your database table/collection
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
