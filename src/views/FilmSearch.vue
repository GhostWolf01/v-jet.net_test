<template>
  <div class="home">
    <Movies v-for="item in data"
      :key="item.id"
      :item="item"
    />
    <div class="home__scroll"></div>
  </div>
</template>

<script>
import Movies from '../components/Movies.vue'

export default {
  name: 'Home',
  components: {
    Movies
  },
  data() {
    return {
      loading: false,
      data: []
    }
  },
  async created() {
    await this.fetch()
  },
  beforeRouteUpdate(to, from, next){
    next()
    this.fetch()
  },
  methods: {
    async fetch() {
      let urlPrams = []
      if (this.$route.query.name !== ''){
        urlPrams.push(`name=${this.$route.query.name}`)
      }
      if(this.$route.query.genre !== ''){
      urlPrams.push(`genres=${this.$route.query.genre}`)
      }
      const response = await this.$http.get(`/movies?${urlPrams.join('&')}`)
      if (response.data){
        this.data = response.data.data
      }
    }
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
