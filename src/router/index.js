import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import MoviesSessions from '../views/MoviesSessions.vue'
import Film from '../views/Film.vue'
import FilmSearch from '../views/FilmSearch.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/v-jet.net_test/',
    name: 'home',
    component: Home
  },
  {
    path: '/v-jet.net_test/movies_sessions',
    name: 'movies_sessions',
    component: MoviesSessions
  },
  {
    path: '/v-jet.net_test/film/:id',
    name: 'film',
    component: Film
  },
  {
    path: '/v-jet.net_test/film_search',
    name: 'film_search',
    component: FilmSearch,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
