const ordinalSuffix = function (i) {
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

module.exports = {
  methods: {
    formatTime (date) {
      date = new Date(date)
      return date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2)
    },

    formatDate (date) {
      date = new Date(date)
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const months = { 5: 'June', 6: 'July' }
      return `${days[date.getDay()]} ${ordinalSuffix(date.getDate())} ${months[date.getMonth()]}`
    }
  }
}
