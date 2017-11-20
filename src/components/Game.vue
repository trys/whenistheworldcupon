<template>
  <div v-if="game" class="wrap insulate">
    <h2>{{ game.title }}</h2>
    <h4>{{ formatDate(game.date) }} {{ formatTime(game.date) }}</h4>
    <a target="_blank" :href="`http://www.google.com/calendar/event?action=TEMPLATE&text=${encodeURI(game.title)}&dates=${formatURLDate(game.date)}`">
      Add to Google Calendar <img src="/static/calendar.svg">
    </a>
  </div>
  <div v-else class="wrap insulate">
    <h2>Page not found</h2>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        required: true,
        type: String
      }
    },

    computed: {
      game () {
        return this.$store.state.games.find(g => g.id === this.id)
      }
    },

    methods: {
      formatURLDate (date) {
        date = new Date(date)
        const endDate = new Date(date)
        endDate.setTime(endDate.getTime() + (2 * 60 * 60 * 1000))
        return `${this.formatSingleDate(date)}00/${this.formatSingleDate(endDate)}00`
      },
      formatSingleDate (date) {
        return `${date.getFullYear()}${this.twoChars(date.getMonth() + 1)}${this.twoChars(date.getDate())}T${date.getHours()}${this.twoChars(date.getMinutes())}`
      },
      twoChars (num) {
        return ('0' + num).slice(-2)
      }
    }
  }
</script>
