<template>
  <div>
    <wc-header>
      <router-link to="/teams">{{ userTeams.length ? 'Change' : 'Choose' }} teams</router-link>
    </wc-header>
    <div class="wrap games">
      <div v-for="day in days" v-if="day.games.length" :key="day.day" class="day">
        <h3>{{ formatDay(day.games[0].date) }}</h3>
        <ul>
          <li v-for="game in day.games" :key="game.id" class="game">
            <span v-if="game.teamOne && game.teamTwo">{{ game.teamOne.name }} v. {{ game.teamTwo.name }}</span> 
            <span v-else>{{ game.name }}</span> 
            <span>{{ formatTime(game.date) }} </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import wcHeader from './wc-header'
  export default {
    computed: {
      filter () {
        return this.$store.state.filter
      },
      userTeams () {
        return this.$store.state.userTeamIds
      },
      days () {
        return this.$store.state.days.map(day => {
          return {
            day: day.day,
            games: day.games.filter(game => {
              return !(this.filter &&
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
      },

      formatDay (date) {
        date = new Date(date)
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const months = { 5: 'June', 6: 'July' }
        return `${days[date.getDay()]} ${this.ordinalSuffix(date.getDate())} ${months[date.getMonth()]}`
      },

      ordinalSuffix (i) {
        const j = i % 10
        const k = i % 100
        if (j === 1 && k !== 11) {
          return i + 'st'
        }
        if (j === 2 && k !== 12) {
          return i + 'nd'
        }
        if (j === 3 && k !== 13) {
          return i + 'rd'
        }
        return i + 'th'
      }
    },

    components: {
      wcHeader
    }
  }
</script>

<style>
  .games-title {
    position: relative;
  }

  .games {
    padding: 0;
  }

  .game {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 0 10px;
  }

  .day {
    padding: 1.5625em 20px 1.5625em;
    border-bottom: 1px solid #FFF;
    position: relative;
  }

  .day:before,
  .day:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -2px;
    width: 25px;
    height: 0;
    border-bottom: 2px solid #96D5BB;
    transform: translateX(-125%);
    z-index: 1;
  }

  .day:after {
    transform: translateX(25%);
  }

  .day:nth-child(2n) {
    background: #F8F8F8;
  }
</style>
