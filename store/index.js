import {
  makeAuthPlugin,
  initAuth,
  // hydrateApi,
  // models,
} from '~/plugins/feathers'
const auth = makeAuthPlugin({
  userService: 'users',
  state: {
    publicPages: ['login', 'signup', 'authcallback'],
  },
  actions: {
    onInitAuth({ state, dispatch }, payload) {
      if (payload) {
        dispatch('authenticate', {
          strategy: 'jwt',
          accessToken: state.accessToken,
        })
          .then((result) => {
            // handle success like a boss
            // console.log('loged in')
          })
          .catch((error) => {
            // handle error like a boss
            // eslint-disable-next-line
            console.error(error)
          })
      }
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

export const modules = {
  // Custom modules
}

export const state = () => ({
  // Custom state
})

export const mutations = {
  // Custom mutations
}

export const actions = {
  // Custom actions
  nuxtServerInit({ commit, dispatch }, { req }) {
    return initAuth({
      commit,
      dispatch,
      req,
      moduleName: 'auth',
      cookieName: 'feathers-jwt',
    })
  },
  nuxtClientInit({ state, dispatch, commit }, context) {
    // hydrateApi({ api: models.api })

    if (state.auth.accessToken) {
      return dispatch('auth/onInitAuth', state.auth.payload)
    }
  },
}

export const getters = {
  // Custom getters
}

export const plugins = [...servicePlugins, auth]

// import {
//   makeAuthPlugin,
//   initAuth,
//   // hydrateApi,
//   // models
// } from '~/plugins/feathers-client'

// const auth = makeAuthPlugin({
//   userService: 'users',
//   state: {
//     publicPages: ['login', 'signup'],
//   },
//   actions: {
//     onInitAuth({ state, dispatch }, payload) {
//       if (payload) {
//         dispatch('authenticate', {
//           strategy: 'jwt',
//           accessToken: state.accessToken,
//         })
//           .then((result) => {
//             // handle success like a boss
//             console.log('loged in')
//           })
//           .catch((error) => {
//             // handle error like a boss
//             console.log('ERROR BROO', error)
//           })
//       }
//     },
//     // authenticate({ commit, dispatch }, dataOrArray) {
//     //   return client.authentication
//     //     .getAccessToken()
//     //     .then((accessToken) => {
//     //       // console.log('accessToken-show', accessToken)
//     //       client.authentication.authenticated = true
//     //       client.emit('login', { accessToken })
//     //       client.emit('authenticated', { accessToken })
//     //       client.authentication.setAccessToken(accessToken).then(() => {})
//     //       return dispatch('responseHandler', { accessToken })
//     //     })
//     //     .catch((error) => {
//     //       // console.error(error)
//     //       commit('setAuthenticateError', error)
//     //       commit('unsetAuthenticatePending')
//     //       return Promise.reject(error)
//     //     })
//     // },
//   },
// })

// const requireModule = require.context(
//   // The path where the service modules live
//   './services',
//   // Whether to look in subfolders
//   false,
//   // Only include .js files (prevents duplicate imports`)
//   /.js$/
// )
// const servicePlugins = requireModule
//   .keys()
//   .map((modulePath) => requireModule(modulePath).default)

// export const state = () => ({
//   // Your custom state
// })

// export const mutations = {
//   // Your custom mutations
// }

// export const actions = {
//   nuxtServerInit({ commit, dispatch }, { req }) {
//     return initAuth({
//       commit,
//       dispatch,
//       req,
//       moduleName: 'auth',
//       cookieName: 'feathers-jwt',
//     })
//   },
//   nuxtClientInit({ state, dispatch, commit }, context) {
//     // hydrateApi({ api: models.api })

//     if (state.auth.accessToken) {
//       return dispatch('auth/onInitAuth', state.auth.payload)
//     }
//   },
// }

// export const getters = {
//   // Your custom getters
// }

// export const plugins = [...servicePlugins, auth]
