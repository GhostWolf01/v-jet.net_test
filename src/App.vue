<template>
  <v-app>
    <div class="menu">
      <v-btn class="menu__btn"
        v-for="(item, index) in menu"
        :key="index"
        @click="toPatchName(item.patchName)"
      >
        {{ item.name }}
      </v-btn>
    </div>
    <v-main>
      <div class="main__search">
        <v-select class="main__search__select"
          label="Жанр"
          :items="searchGenerItems"
          v-model="searchGener"
        ></v-select>
        <v-text-field class="main__search__text"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-btn class="main__search__btn"
          @click="toSearch"
        >
          Поиск
        </v-btn>
      </div>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      search: '',
      searchGenerItems: [
        {
          value: '',  
          text: 'All'
        }
      ],
      searchGener: '',
      menu: [
        {
          name: 'Главная',
          patchName: 'home'
        },
        {
          name: 'Все сеансы в кинотеатре',
          patchName: 'movies_sessions'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      getGenres: 'getGenres'
    })
  },
  created() {
    for(const key in this.getGenres){
      this.searchGenerItems.push({
        value: key,  
        text: this.getGenres[key]
      })
    }
  },
  methods: {
    toPatchName(patchName) {
      this.$router.push({
        name: patchName
      })
    },
    toSearch() {
      this.$router.push({
        name: 'film_search',
        query: {
          name: this.search,
          genre: this.searchGener
        }
      }).catch(() => {})
    }
  }
};
</script>

<style lang="scss">
.v-application{
  background-color: var(--grey-darken-4) !important;
}
.main__search{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 20px;
  &__text{

  }
  &__select{
    width: 150px !important;
    max-width: 150px !important;
    margin-right: 10px;
  }
  &__btn{
    margin-top: 15px;
    margin-left: 10px;
    width: 200px !important;
  }
}
.v-main{
  height: 100vh;
  width: 100vw;
}
.v-main__wrap{
  display: flex !important;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.menu{
  &__btn{
    margin: 0 5px;
  }
}
</style>
