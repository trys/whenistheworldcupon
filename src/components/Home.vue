<template>
  <div v-if="!init" class="wrap insulate onboarding">
    <p>Cras mattis consectetur purus sit amet fermentum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec id elit non mi porta gravida at eget metus. Donec sed odio dui.</p>
    <div class="buttons">
      <router-link class="button" :to="{ name: 'Teams' }">Follow some teams</router-link><br>
      <button type="button" class="button" @click="init = true">View all fixtures</button>
    </div>
  </div>
  <Games v-else />
</template>

<script>
import Games from './Games'
export default {
  name: 'Home',

  data () {
    return {
      init: this.$store.state.init
    }
  },

  mounted () {
    this.$store.commit('setInit')
  },

  components: {
    Games
  }
}
</script>

<style>

.onboarding {
  max-width: 450px;
  margin: 0 auto;
  text-align: center;
  padding: 40px 20px 0;
}

.onboarding p {
  line-height: 1.5;
}

.onboarding .buttons {
  text-align: center;
}

.onboarding .button {
  min-width: 13em;
}

</style>
