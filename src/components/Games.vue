<template>
  <div>
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
    <footer v-if="days.length && $store.state.filter && $store.state.userTeamIds.length" class="wrap">
      <br><br>
      <a class="button" target="_blank" :href="`mailto:?subject=Holiday&body=${encodeURI(email)}`">Book off your holiday</a>
    </footer>
  </div>
</template>

<script>
  
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
        }).filter(d => d.games.length)
      },
      email () {
        const emailGames = []
        this.days.forEach(day => {
          if (!day.games.length) return
          day.games.forEach(game => {
            const day = new Date(game.date).getDay()
            if (day !== 0 && day !== 6) {
              emailGames.push(game)
            }
          })
        })

        const emailTeams = this.$store.getters.userTeams.map(t => t.name).join(', ').replace(/,(?!.*,)/gmi, ' and')

        const emailTime = new Date().getHours() >= 12 ? 'afternoon' : 'morning'

        return [
          'Good ' + emailTime + ',',
          '',
          'I would like to book some holiday off in readiness for the upcoming ' + emailTeams + ' World Cup games. The dates are as follows:',
          '',
          ...emailGames.map(game => '- ' + this.formatDate(game.date)),
          '',
          'If we make it through the group stages, I may need to take some more time off - I\'ll let you know by the 30th June.',
          '',
          'Many thanks,',
          ''
        ].join('\r\n')
      }
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
