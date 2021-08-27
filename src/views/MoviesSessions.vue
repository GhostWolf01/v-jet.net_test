<template>
  <div class="movies-sessions">
    <MovieSessions v-for="item in getMoviesData"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MovieSessions from '../components/MovieSessions.vue'

export default {
  name: 'MoviesSessions',
  components: {
    MovieSessions
  },
  data() {
    return {
      data: []
    }
  },
  computed: {
    ...mapGetters({
      getMoviesData: 'getMoviesData'
    })
  },
  async created() {
    await this.loadMovieShowsData()
    if(!this.getMoviesData){
      await this.loadMoviesData()
    }
  },
  methods: {
    ...mapActions({
      loadMovieShowsData: 'loadMovieShowsData',
      loadMoviesData: 'loadMoviesData'
    })
  },
}
</script>

<style lang="scss">
.movies-sessions{
  width: 100%;
  height: 100%;
  padding: 40px;
  background-color: var(--grey-darken-4);
  overflow: auto;
}
</style>