<template>
  <div v-if="!init" class="wrap insulate onboarding">
    <p>Timezones are tough. We've organised every 2018 World Cup game into your local timezone, so you'll know when to set the alarm clock. Follow your team(s) to get a personalised fixture list and we'll update it if &amp; when they make it through the group stages. It works offline on Android and there's even a handy 'book your holiday' button!</p>
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
