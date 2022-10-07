export default {
  namespaced: true,
  state: {
    queue: [],
    message: '',
    timeout: 6000,
    timeoutId: null,
    actionLabel: null,
    actionDispatchId: null,
    actionPayload: null,
    visible: false,
  },
  getters: {
    message: (state) => {
      return state.message
    },
    timeout: (state) => {
      return state.timeout
    },
    timeoutId: (state) => {
      return state.timeoutId
    },
    actionLabel: (state) => {
      return state.actionLabel
    },
    actionDispatchId: (state) => {
      return state.actionDispatchId
    },
    actionPayload: (state) => {
      return state.actionPayload
    },
    visible: (state) => {
      return state.visible
    },
    hasNext: (state) => {
      return state.queue.length > 0
    },
  },
  mutations: {
    push: (state, { message, timeout, action }) => {
      state.queue.push({
        message,
        timeout: timeout != null ? timeout : 6000,
        action:
          action != null
            ? action
            : { label: null, dispatchId: null, payload: null },
      })
    },
    pop: (state) => {
      if (state.queue.length > 0) {
        const d = state.queue.splice(0, 1)[0]
        state.message = d.message
        state.timeout = d.timeout
        state.visible = true
        state.actionLabel = d.action.label
        state.actionDispatchId = d.action.dispatchId
        state.actionPayload = d.action.payload
      }
    },
    setTimeoutId: (state, id) => {
      state.timeoutId = id
    },
    show: (state) => {
      state.visible = true
    },
    hide: (state) => {
      state.visible = false
    },
  },
  actions: {
    queue: ({ commit, dispatch, getters }, payload) => {
      commit('push', payload)
      if (!getters.visible) {
        dispatch('show')
      }
    },
    show: ({ commit, getters }) => {
      if (getters.hasNext) {
        commit('pop')
        const id = setTimeout(() => {
          commit('hide')
        }, getters.timeout)
        commit('setTimeoutId', id)
      }
    },
    action: ({ commit, getters, dispatch }) => {
      if (getters.actionDispatchId) {
        dispatch(getters.actionDispatchId, getters.actionPayload, {
          root: true,
        })
      }
      clearTimeout(getters.timeoutId)
      commit('hide')
    },
  },
}
