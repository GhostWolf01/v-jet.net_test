<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
  > 
    <v-card class="book-place">
      <div class="book-place__header"
        v-if="!bookPlaceData"
      >
        <p class="book-place__header__title"
          v-html="`Забронировать билеты на ${data.nameFilm}`"
        ></p>
      </div>
      <div class="book-place__body">
        <div class="book-place__body__show-date"
          v-if="!bookPlaceData"
        >
          <v-select class="book-place__body__show-date__select"
            :items="showDateItems"
            v-model="showDateItem"
            label="День"
            @change="changeShowDate"
          />
          <v-select class="book-place__body__show-date__select"
            :items="dayTimeItems"
            v-model="dayTimeItem"
            :disabled="!activeDayTime"
            label="Время"
            @change="changeDayTime"
          />  
        </div>
        <div class="book-place__body__places"
          v-if="!bookPlaceData"
        >
          <v-select class="book-place__body__places__select"
            :items="rowsItems"
            v-model="rowsItem"
            :disabled="!activeRows"
            label="Ряд"
            @change="changeRows"
          />
          <v-select class="book-place__body__places__select"
            :items="seatsItems"
            v-model="seatsItem"
            :disabled="!activeSeats"
            @change="changeSeats"
            label="Место"
          />  
        </div>
        <div class="book-place__body__places__ssuces"
          v-if="bookPlaceData"
        >
          <p class="book-place__body__places__success__title"
            v-html="`Забронирован билеты на ${data.nameFilm}`"
          ></p>
          <p class="book-place__body__places__success__text">
            День: {{bookPlaceData.showdate}}<br>
            Время: {{bookPlaceData.daytime}}<br>
            Ряд: {{bookPlaceData.row}}<br>
            Место: {{bookPlaceData.seat}}<br>            
            Билет: {{bookPlaceData.ticketkey}}<br>
          </p>
        </div>
      </div>
      <div class="book-place__footer">
        <v-btn class="book-place__footer__btn"
          @click="close"
        >
          Закрыть
        </v-btn>
        <v-btn class="book-place__footer__btn"
          @click="toBook"
          :disabled="!activeToBook"
          v-if="!bookPlaceData"
        >
          Забронировать
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'BookPlace',
  data() {
    return {
      dialog: false,
      data: {
        nameFilm: '',
        id: null
      },

      movieSessions: [],

      showDateItems: [],
      showDateItem: '',

      dayTimeItems: [],
      dayTimeItem: '',
      activeDayTime: false,

      showPlacesData: [],

      rowsItems: [],
      rowsItem: '',
      activeRows: false,

      seatsItems: [],
      seatsItem: '',
      activeSeats: false,

      activeToBook: false,
      bookPlaceData: null
    }
  },
  methods: {
    async fetch () {
      let response = await this.$http.get(`/movieShows?movie_id=${this.data.id}`)
      if (response.data){
        this.movieSessions = response.data.data[this.data.id]
        for (const item of this.movieSessions) {
          this.showDateItems.push(item.showdate)
        }
        
      }
    },
    async handleShow(data) {
      this.data = data
      this.movieSessions = []

      this.showDateItems = []
      this.showDateItem = ''

      this.dayTimeItems = []
      this.dayTimeItem = ''

      this.showPlacesData = []

      this.rowsItems = []
      this.rowsItem = ''

      this.seatsItems = []
      this.seatsItem = ''

      await this.fetch()
      this.dialog = true
    },
    changeShowDate() {
      for (const item of this.movieSessions){
        if (this.showDateItem === item.showdate){
          this.dayTimeItems = item.daytime.split(';')
          break;
        }
      }

      this.activeDayTime = true
    },
    async changeDayTime() {
      const response = await this.$http.get(`/showPlaces?movie_id=${this.data.id}&daytime=${this.dayTimeItem}&showdate=${this.showDateItem}`)
      if (response.data){
        this.showPlacesData = response.data.data
        for (const item of this.showPlacesData){
          this.rowsItems.push(item[0].row)
        }

        this.activeRows = true
      }
    },
    changeRows() {
      for ( const item of this.showPlacesData){
        if (item[0].row === this.rowsItem){
          for (const seat of item[1]){
            if(seat.is_free){
              this.seatsItems.push(seat.seat)
            }
          }
          break;
        }
      }

      this.activeSeats = true
    },
    changeSeats() {
      this.activeToBook = true
    },
    close () {
      this.dialog = false
    },
    async toBook () {
      try {
        const response = await this.$http.post('/bookPlace', {
          movie_id: this.data.id,
          row: this.rowsItem,
          seat: this.seatsItem,
          showdate: this.showDateItem,
          daytime: this.dayTimeItem
        })
        if (response.data) {
          this.bookPlaceData = response.data.data
        }
      } catch ( error ) {
        console.log(error)
      }
    }

  }
}
</script>

<style lang="scss">
.book-place{
  width: 500px;
  padding: 20px;
  display: flex !important;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  &__header{
    width: 100%;
    display: flex;
    margin-bottom: 20px;
  }
  &__body{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    &__show-date{
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      &__select{
        margin: 0 5px;
      }
    }
    &__places{
      display: flex;
      justify-content: center;
      align-items: center;
      &__select{
        margin: 0 5px;
      }
    }
  }
  &__footer{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &__btn{
      margin-left: 10px;
    }
  }
}
</style>