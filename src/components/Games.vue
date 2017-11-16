<template>
  <div>
    <h2>{{ isPersonal ? 'Your ' : '' }} Games</h2>
    <ul>
      <li v-for="day in days" v-if="day.games.length" :key="day.day" class="day">
        <h3>{{ day.day }}</h3>
        <ul>
          <li v-for="game in day.games" :key="game.id" class="game">
            <template v-if="game.teamOne">
              <span>{{ game.teamOne.name }} v. {{ game.teamTwo.name }}</span> <span>{{ formatTime(game.date) }} </span>
            </template>
            <template v-else>
              {{ game.name }}
            </template>
          </li>
        </ul>
      </li>
    </ul>
    <wc-footer>
      <router-link to="/teams">Change teams</router-link>
    </wc-footer>
  </div>
</template>

<script>
  import WcFooter from './Wc-Footer'
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
            day: day.day,
            games: day.games.filter(game => {
              return !(this.isPersonal &&
              this.userTeams.length &&
              !this.userTeams.includes(game.teamOneId) &&
              !this.userTeams.includes(game.teamTwoId))
            })
          }
        })
      }
    },

    methods: {
      formatTime (date) {
        date = new Date(date)
        return date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2)
      }
    },

    components: {
      WcFooter
    }
  }
</script>

<style>
  .game {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 16px;
  }

  .day {
    padding: 20px 0;
    border-bottom: 1px solid #FFF;
  }

  .day:first-child {
    padding-top: 0;
  }
</style>
