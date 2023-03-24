import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  state () {
    return {
      count: 0,
      bannerList:[],
      solutionList:[],
      productsList:[]
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setBannerList(state,list){
      state.bannerList = list
    },
    setSolutionList(state,list){
      state.solutionList = list
    },
    setProductsList(state,list){
      state.productsList = list
    }

  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})
export default store
