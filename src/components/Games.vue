<template>
  <div>
    <h2>{{ isPersonal ? 'Your ' : '' }} Games</h2>
    <ul>
      <li v-for="day in days" v-if="day.games.length" :key="day.date">
        {{ day.date }}
        <ul>
          <li v-for="game in day.games" :key="game.id">
            {{ game.datetime }} {{ game.teamOne.name }} vs. {{ game.teamTwo.name }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      isPersonal: Boolean
    },
    computed: {
      userTeams () {
        return this.$store.state.userTeamIds
      },
      days () {
        return this.$store.state.days.map(day => {
          return {
            day,
            date: day.date,
            games: day.games.filter(game => {
              return !(this.isPersonal &&
              this.userTeams.length &&
              !this.userTeams.includes(game.teamOneId) &&
              !this.userTeams.includes(game.teamTwoId))
            })
          }
        })
      }
    }
  }
</script>
