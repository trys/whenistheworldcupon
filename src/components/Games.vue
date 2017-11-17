<template>
  <div>
    <wc-header>
      <router-link to="/teams">{{ userTeams.length ? 'Change' : 'Choose' }} teams</router-link>
    </wc-header>
    <div class="wrap games">
      <div v-for="day in days" v-if="day.games.length" :key="day.key" class="day">
        <h3>{{ formatDate(day.games[0].date) }}</h3>
        <ul>
          <li v-for="game in day.games" :key="game.id">
            <router-link class="game" :to="{ name: 'Game', params: { id: game.id } }">
              <span>{{ game.title }}</span> 
              <span class="game-time">{{ formatTime(game.date) }}</span>
            </router-link>
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
    justify-content: flex-end;
    align-items: top;
    width: 100%;
    margin: 0 0 10px;
  }

  .game > img {
    max-width: 16px;
    height: auto;
    margin: 0 15px 0 10px;
  }

  .game > :first-child {
    margin-right: auto;
  }

  .game-time {
    text-align: right;
    width: 3em;
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
