<template>
  <div class="wrap insulate onboarding">
    <p>Привет! Как дела?</p>
    <p>Possibly the worst thing about Russia is the timekeeping.</p>
    <p>Timezones are tough. Russia has <strong>ELEVEN OF THEM</strong>.</p>
    <p>With 32 teams playing 63 games, how on earth are you supposed to know when your favourite team is playing at the upcoming World Cup?!</p>
    <p>Luckily, we’ve got your back.</p>
    <p>We’ve already grabbed your time zone based on your browser – just select the teams you’re supporting and there’s your personalised fixture list.</p>
    <p>And, if you want to get the jump on your colleagues, we’ve provided a ‘book your holiday button’ that will provide a pre-written email with the dates you need!</p>
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
  padding: 30px 20px 0;
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
