import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  state () {
    return {
      count: 0,
      bannerList:[],
      solutionList:[],
      productsList:[],
      caseList:[],
      newsList:[],
      videoTopList:[],
      videoList:[],
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
    },
    setNewsList(state,list){
      state.newsList = list
    },
    setVideoList(state,list){
      state.videoList = list
    },
    setVideoTopList(state,list){
      state.videoTopList = list
    },
    setCaseList(state,list){
      state.caseList = list
    }

  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})
export default store
