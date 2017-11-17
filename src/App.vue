<template>
  <div id="app">
    <header class="top wrap">
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
  font-family: 'Barlow', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #FFF;
  margin: 0;
  padding: 15px 20px;
  color: #666;
  font-size: 22px;
}

#app {
  margin: 0 auto;
  max-width: 600px;
  padding-bottom: 66px;
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

.top {
  border-bottom: 2px solid #EEE;
  margin: 0 0 20px;
  position: relative;
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
  right: 0;
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
  font-size: 22px;
  margin: 0 0 11px;
  width: 7.5em;
  line-height: 1.125em;
}

h2 {
  margin: 0 0 16px;
}

h3 {
  font-size: 22px;
  margin: 0 0 10px;
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
</style>
