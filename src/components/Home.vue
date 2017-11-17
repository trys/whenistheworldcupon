<template>
  <div>
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

