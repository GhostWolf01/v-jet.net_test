<template>
  <v-card class="movie-sessions">
    <img class="movie-sessions__img"
      :src="item.image" 
      alt="movie image">
    <div class="movie-sessions__info">
      <p class="movie-sessions__info-title"
        v-html="item.name"
      ></p>
      <div class="movie-sessions__info__date">
        <p class="movie-sessions__info__date__item"
          v-for="(movieShowsItem, index) in getMovieShowsData[item.id]"
          :key="index"
        >
          {{`${movieShowsItem.showdate}: ${movieShowsItem.daytime.replace(/;/g, '; ')}`}}
        </p>
      </div>
    </div>
    <v-btn class="movie-sessions__btn"
      @click="toBook"
    >
      Забронировать Билет
    </v-btn>
    <BookPlace ref="bookPlace"/>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import BookPlace from './BookPlace.vue'

export default {
  name: "MovieSessions",
  components: {
    BookPlace
  },
  props: {
    item: { type: Object }
  },
  computed: {
    ...mapGetters({
      getMovieShowsData: 'getMovieShowsData'
    })
  },
  methods:{
    toBook() {
      this.$refs.bookPlace.handleShow({
        nameFilm: this.item.name,
        id: this.item.id
      })
    }
  }
}
</script>

<style lang="scss">
.movie-sessions{
  position: relative;
  display: flex !important;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  margin-bottom: 10px;
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
    &-title{
      font-size: 1.4rem;
      margin-bottom: 10px !important;
    }
  }
  &__date{
    &__item{
      margin-bottom: 10px;
    }
  }
  &__btn{
    position: absolute !important;
    bottom: 20px;
    right: 20px;
  }
}
</style>