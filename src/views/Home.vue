<template>
  <div class="home">
    <Movies v-for="item in getMoviesData"
      :key="item.id"
      :item="item"
    />
    <div class="home__scroll"></div>
  </div>
</template>

<script>
import Movies from '../components/Movies.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Movies
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      getMoviesData: 'getMoviesData',
    })
  },
  async created() {
    await this.loadMoviesData()
  },
  methods: {
    ...mapActions({
      loadMoviesData: 'loadMoviesData'
    })
  }
}
</script>

<style lang="scss">
.home{
  width: 100%;
  height: 100%;
  padding: 40px;
  background-color: var(--grey-darken-4);
  overflow: auto;
  &__scroll{
    height: 1px;
    width: 100%;
  }
}
</style>
