<template>
  <div id="app">
    <header class="top wrap">
      <h1><router-link to="/">When is the World Cup on?</router-link></h1>
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
  }
}
</script>

<style>
body {
  font-family: 'Barlow', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #AD2126;
  margin: 0;
  padding: 15px 20px;
  color: #FFF;
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
  border-bottom: 2px solid #FFF;
  margin: 0 0 20px;
}

h1 {
  font-size: 32px;
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
