<template>
  <div id="app">
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
    <router-view/>
  </div>
</template>

<script>
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
  },

  methods: {
    toggleFilter () {
      if (this.$route.name !== 'Home') {
        this.$store.commit('setFilter', true)
        this.$router.push({ name: 'Home' })
      } else {
        this.$store.commit('toggleFilter')
      }
    }
  }
}
</script>

<style>
body {
  font-family: 'Montserrat Alternates', Helvetica, Arial, sans-serif;
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

#app {
  margin: 0 auto;
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

.wrap {
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
  position: relative;
}

.insulate {
  padding-top: 20px;
  padding-bottom: 20px;
}

.top {
  background: #47CB94;
  color: #FFF;
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
  height: 17px;
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

h2 {
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
  font-weight: 700;
  font-size: inherit;
}
</style>
