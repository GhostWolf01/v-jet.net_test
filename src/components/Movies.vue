<template>
  <v-card class="home__item">
    <img class="home__item-img"
      :src="item.image" 
      alt="movie image">
    <div class="home__item-info">
      <p class="home__item-info__title"
        v-html="item.name"
      >
      </p>
      <p class="home__item-info__genre">
        Жанр: {{ getGenres[item.genre] }}
      </p>
      <div class="home__item-info__description"
        v-html="item.description"
      >
      </div>
    </div>
    <v-btn class="home__item-btn"
      @click="toFilm"
    >
      Подробней
    </v-btn>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Movies',
  props: {
    item: { type: Object },
  },
  computed: {
    ...mapGetters({
      getGenres: 'getGenres'
    })
  },
  methods: {
    toFilm(){
      this.$router.push({
        name: 'film',
        params: {
          id: this.item.id
        }
      })
    }
  },
}
</script>

<style lang="scss">
.home__item{
  position: relative;
  display: flex !important;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  margin-bottom: 10px;
  &-img{
    height: 340px;
    width: 240px;
    flex-shrink: 0;
    margin-right: 10px;
  }
  &-info{
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    &__title{
      font-size: 1.4rem;
      margin-bottom: 10px !important;
    }
    &__genre{
      font-size: 1.2rem;
      margin-bottom: 10px !important;
    }
    &__description{
      font-size: 1.1rem;
    }
  }
  &-btn{
    position: absolute !important;
    bottom: 20px;
    right: 20px;
  }
}
</style>