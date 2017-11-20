<template>
  <div id="app">
    <div class="sticky">
      <header class="top">
        <div class="wrap insulate">
          <h1>
            <router-link to="/">When is the World Cup on?</router-link>
          </h1>
          <button
            type="button"
            @click="toggleFilter"
            :class="{
              'button-reset': true,
              'filter' : true,
              'filter--active': !!$store.state.filter
            }"
            aria-label="Filter"
          >
            <img src="./assets/filter.svg" alt="">
          </button>
        </div>
      </header>
      
      <wc-header>
        <router-link v-if="$route.name === 'Home'" to="/teams">{{ $store.state.userTeamIds.length ? 'Change' : 'Choose' }} teams</router-link>
        <router-link
          v-if="$route.name === 'Teams'"
          class="see-fixtures"
          @click.native="$store.commit('setFilter', true)"
          :to="{ name: 'Home' }"
        >See the fixtures</router-link>
      </wc-header>
    </div>

    <main role="main">
      <router-view/>
    </main>
    
    <footer class="low">
      <div class="wrap">
        Made by <a href="http://www.tomango.co.uk">Tomango</a>
        <!-- 2017/11/18 19:57 -->
      </div>
    </footer>

  </div>
</template>

<script>
import wcHeader from './components/wc-header'
export default {
  name: 'app',
  created () {
    this.$store.dispatch('fetchGames')

    const currentIds = JSON.parse(localStorage.getItem('witwco_userTeams'))
    if (currentIds && Array.isArray(currentIds)) {
      this.$store.commit('setUserTeamIds', currentIds)
    }

    const userFilter = localStorage.getItem('witwco_userFilter') === 'true'
    this.$store.commit('setFilter', userFilter)

    const userInit = localStorage.getItem('witwco_userInit') === 'true'
    if (userInit) {
      this.$store.commit('setInit')
    }
  },

  components: {
    wcHeader
  },

  methods: {
    toggleFilter () {
      if (this.$store.state.userTeamIds.length) {
        this.$store.commit('toggleFilter')
      } else {
        this.$store.commit('setFilter', false)
      }

      if (this.$route.name !== 'Home') {
        this.$router.push({ name: 'Home' })
      } else if (this.$store.state.userTeamIds.length === 0) {
        this.$router.push({ name: 'Teams' })
      }
    }
  }
}
</script>

<style>
body {
  font-family: 'Montserrat Alternates', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #FFF;
  margin: 0;
  padding: 0;
  color: #565656;
  font-size: calc( 16px + 4 * (100vw - 320px) / (600 - 320));
}

@media screen and (min-width: 600px) {
  body {
    font-size: 20px;
  }
}

a {
  color: inherit;
  text-decoration: none;
}

html {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

[role=main],
.wrap {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.wrap {
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
}

.insulate {
  padding-top: 20px;
  padding-bottom: 20px;
}

.sticky {
  position: sticky;
  z-index: 10;
  top: 0;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e9eae9' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.top {
  background: #47CB94;
  color: #FFF;
}

[role="main"] {
  padding-bottom: 40px;
  background: #FFF;
  border-right: 1px solid #EEE;
  border-left: 1px solid #EEE;
  flex: 1;
}

.low {
  background: #EEE;
  font-size: 12px;
  padding: 20px 0;
}

button {
  cursor: pointer;
}

.button-reset {
  -webkit-tap-highlight-color: transparent;
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  box-shadow: none;
  outline: none;
  border-radius: 0;
}

.filter {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 18px;
  overflow: hidden;
}

.filter img {
  transition: 300ms transform;
}

.filter--active img {
  transform: translateX(9px);
}

h1 {
  font-size: 1em;
  margin: 0;
  line-height: 1.1875em;
}

h2,
h4 {
  margin: 0 0 16px;
}

h3 {
  font-size: 1em;
  margin: 0 0 20px;
  color: #979696;
  letter-spacing: 2px;
  text-align: center;
  text-transform: uppercase;
}

p {
  margin: 0 0 16px;
}

ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
  margin: 0;
}

.button {
  -webkit-tap-highlight-color: transparent;
  border: none;
  background: #47CB94;
  padding: 10px 20px;
  margin: 10px 0;
  box-shadow: none;
  outline: none;
  border-radius: 5px;
  color: #FFF;
  font: inherit;
  font-weight: 700;
  display: inline-block;
}
</style>
