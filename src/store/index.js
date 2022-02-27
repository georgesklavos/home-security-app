import Vuex from "vuex";

const store = new Vuex.Store({
    state: {
      count: 0
    },
    getters: {
        count(state) {
            return state.count;
        }
    },
    mutations: {
      increment (state) {
        state.count++
      }
    },
    actions: {
      increment (context) {
        context.commit('increment')
      }
    }
  })

export default store;