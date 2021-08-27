<template>
<div class="film">
  <v-card class="film__container">
    <img class="film__img"
      :src="data.image" 
      alt="movie image">
    <div class="film__info">
      <p class="film__info__title"
        v-html="data.name"
      >
      </p>
      <p class="film__info__genre">
        Жанр: {{ getGenres[data.genre] }}
      </p>
      <div class="film__info__container">
        <div class="film__info__additional"
          v-html="data.additional"
        ></div>
        <div class="film__info__description"
          v-html="data.description"
        ></div>
      </div>
      <div class="film__movie-sessions">
        <p class="film__movie-sessions__info-title">
          Сеансы в кинотеатре
        </p>
        <p class="film__movie-sessions__info-date"
          v-for="(movieShowsItem, index) in movieSessions"
          :key="index"
        >
          {{`${movieShowsItem.showdate}: ${movieShowsItem.daytime.replace(/;/g, '; ')}`}}
        </p>
      </div>
    </div>
    <v-btn class="film__movie-sessions__btn"
      @click="toBook"
    >
      Забронировать Билет
    </v-btn>
  </v-card>
  <div class="film__scroll"></div>
  <BookPlace ref="bookPlace"/>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import BookPlace from '../components/BookPlace.vue'

export default {
  name: 'Film',
  components: {
    BookPlace
  },
  data() {
    return {
      data: {},
      movieSessions: []
    }
  },
  computed: {
    ...mapGetters({
      getMoviesData: 'getMoviesData',
      getGenres: 'getGenres'
    })
  },
  async created() {
    await this.fetch()
  },
  methods: {
    async fetch() {
      let response = await this.$http.get(`/movies?movie_id=${this.$route.params.id}`)
      if (response.data){
        this.data = response.data.data[0]
      }

      response = await this.$http.get(`/movieShows?movie_id=${this.$route.params.id}`)
      if (response.data){
        this.movieSessions = response.data.data[this.$route.params.id]
      }
    },
    toBook() {
      this.$refs.bookPlace.handleShow(
        {
          id: this.data.id,
          nameFilm: this.data.name
        }
      )
    }
  }
}
</script>

<style lang="scss">
.film{
  width: 100%;
  height: 100%;
  padding: 40px;
  overflow: auto;
  &__container{
    position: relative;
    padding: 20px 20px 40px 20px;
    display: flex !important;
    justify-content: flex-start;
    align-items: flex-start;
  }
  &__img{
    height: 340px;
    width: 240px;
    flex-shrink: 0;
    margin-right: 10px;
  }
  &__info{
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    &__container{
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }
    &__title{
      font-size: 1.4rem;
      margin-bottom: 10px !important;
    }
    &__genre{
      font-size: 1.2rem;
      margin-bottom: 10px !important;
    }
    &__description{
      width: 55%;
      font-size: 1.1rem;
    }
    &__additional{
      width: 45%;
      font-size: 1.1rem;
    }
  }
  &__movie-sessions{
    &__info{
      display: flex;
      &-title{
        font-size: 1.2rem;
        margin-bottom: 10px !important;
      }
      &-date{
        font-size: 1.1rem;
        margin-bottom: 5px !important;
      }
    }
    &__btn{
      position: absolute !important;
      right: 20px;
      bottom: 20px;
    }
  }
  &__scroll{
    margin-top: 20px;
    height: 1px;
    width: 100%;
  }
}
</style>