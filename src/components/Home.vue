<template>
  <div class="wrap insulate onboarding">
    <p>Timezones are tough. We've organised every 2018 World Cup game into your local timezone, so you'll know when to set the alarm clock. Follow your team(s) to get a personalised fixture list and we'll update it if &amp; when they make it through the group stages. It works offline on Android and there's even a handy 'book your holiday' button!</p>
    <div class="buttons">
      <router-link class="button" :to="{ name: 'Teams' }">Follow some teams</router-link><br>
      <router-link class="button" :to="{ name: 'Games' }">View all fixtures</router-link><br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
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
