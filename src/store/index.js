import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: '',
}
const mutations = {
  setToken(state, val) {
    state.token = val
  },
}
const actions = {}
const getters = {}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

export default store
