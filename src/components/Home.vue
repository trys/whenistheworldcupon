<template>
  <div class="hello">
    <Games />
  </div>
</template>

<script>
import Teams from './Teams'
import Games from './Games'
export default {
  name: 'Home',
  data () {
    return {
      isPersonal: false
    }
  },

  components: {
    Teams,
    Games
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
