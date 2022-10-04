import client, {
  makeAuthPlugin,
  initAuth,
  // models
} from '~/plugins/feathers-client'
const auth = makeAuthPlugin({
  userService: 'users',
  state: {
    publicPages: ['login', 'signup'],
  },
  actions: {
    authenticate({ commit, dispatch }, dataOrArray) {
      return client.authentication
        .getAccessToken()
        .then((accessToken) => {
          // console.log('accessToken-show', accessToken)
          client.authentication.authenticated = true
          client.emit('login', { accessToken })
          client.emit('authenticated', { accessToken })
          client.authentication.setAccessToken(accessToken).then(() => {})
          return dispatch('responseHandler', { accessToken })
        })
        .catch((error) => {
          // console.error(error)
          commit('setAuthenticateError', error)
          commit('unsetAuthenticatePending')
          return Promise.reject(error)
        })
    },
  },
})

const requireModule = require.context(
  // The path where the service modules live
  './services',
  // Whether to look in subfolders
  false,
  // Only include .js files (prevents duplicate imports`)
  /.js$/
)
const servicePlugins = requireModule
  .keys()
  .map((modulePath) => requireModule(modulePath).default)

export const state = () => ({
  // Your custom state
})

export const mutations = {
  // Your custom mutations
}

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req }) {
    return initAuth({
      commit,
      dispatch,
      req,
      moduleName: 'auth',
      cookieName: 'feathers-jwt',
    })
  },
}

export const getters = {
  // Your custom getters
}

export const plugins = [...servicePlugins, auth]
