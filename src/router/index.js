import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import MoviesSessions from '../views/MoviesSessions.vue'
import Film from '../views/Film.vue'
import FilmSearch from '../views/FilmSearch.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/movies_sessions',
    name: 'movies_sessions',
    component: MoviesSessions
  },
  {
    path: '/film/:id',
    name: 'film',
    component: Film
  },
  {
    path: '/film_search',
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
