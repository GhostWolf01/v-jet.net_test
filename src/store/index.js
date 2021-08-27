import Vue from 'vue'
import Vuex from 'vuex'
import http from '../plugins/http.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movieShowsData: null,
    moviesData: null,
    genres: {
      0: 'ACTION',
      1: 'ADVENTURES',
      2: 'COMEDY',
      3: 'DRAMA',
      4: 'HORROR',
      5: 'WESTERNS'
    },
  },
  getters: {
    getMoviesData: state => state.moviesData,
    getMovieShowsData: state => state.movieShowsData,
    getGenres: state => state.genres
  },
  mutations: {
    LoadMoviesData(state, data){
      state.moviesData = data
    },
    LoadMovieShowsData(state, data){
      state.movieShowsData = data
    }
  },
  actions: {
    async loadMoviesData ({ commit }) {
      const reponse = await http.get('/movies')
      if(reponse.data){
        const data = reponse.data.data
        commit('LoadMoviesData', data)
      }
    },
    async loadMovieShowsData ({ commit }) {
      const reponse = await http.get('/movieShows')
      if(reponse.data){
        const data = reponse.data.data
        commit('LoadMovieShowsData', data)
      }
    },
  },
  modules: {
  }
})
