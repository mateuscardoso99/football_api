import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    leagueData: null,
    scorers: null,
    matches: null,
  },
  mutations: {
    setLeague(state,data){
      state.leagueData = data 
    },
    setMatches(state,data){
      state.matches = data 
    },
    setScorers(state,data){
      state.scorers = data 
    }
  },
})
