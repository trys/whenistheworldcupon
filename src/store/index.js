import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
let fetchingPosts = false

export default new Store({
  state: {
    days: [],
    teams: [],
    error: '',
    userTeamIds: [],
    filter: null
  },

  getters: {
    userTeams (state) {
      return !state.teams.length ? [] : state.userTeamIds.map(id => {
        return state.teams.find(t => t.id === id)
      })
    }
  },

  actions: {
    fetchGames ({ commit, state }) {
      if (!fetchingPosts) {
        fetchingPosts = true
        return axios.get('/static/data.json')
          .then(({ data }) => {
            commit('addTeams', data)
            commit('addDays', data)
            if (state.error) {
              commit('error', '')
            }
          })
          .catch(err => {
            commit('error', err)
          })
      }
    }
  },

  mutations: {
    addDays (state, { games }) {
      games.forEach(game => {
        const date = new Date(game.date)
        const dateKey = `${date.getMonth()}${date.getDate()}`
        let index = state.days.findIndex(d => d.key === dateKey)
        if (index === -1) {
          state.days.push({ key: dateKey, games: [] })
          index = state.days.findIndex(d => d.key === dateKey)
        }
        game.teamOne = state.teams.find(t => t.id === game.teamOneId)
        game.teamTwo = state.teams.find(t => t.id === game.teamTwoId)
        state.days[index].games.push(game)
      })
    },
    addTeams (state, { teams }) {
      teams.forEach(team => {
        if (!state.teams.find(p => p.id === team.id)) {
          state.teams.push(team)
        }
      })
    },
    error (state, { message }) {
      state.error = message
    },
    setFilter (state, filter) {
      state.filter = filter
      localStorage.setItem('witwco_userFilter', state.filter)
    },
    toggleFilter (state) {
      state.filter = !state.filter
      localStorage.setItem('witwco_userFilter', state.filter)
    },
    setUserTeamIds (state, teams) {
      teams.forEach(t => {
        const teamId = t.substring(0, 2)
        if (state.teams.find(t => t.id === teamId) !== -1) {
          state.userTeamIds.push(teamId)
        }
      })
    },
    toggleUserTeamId (state, teamId) {
      const index = state.userTeamIds.indexOf(teamId)
      if (index === -1) {
        state.userTeamIds.push(teamId)
      } else {
        state.userTeamIds.splice(index, 1)
      }
      localStorage.setItem('witwco_userTeams', JSON.stringify(state.userTeamIds))
    }
  }
})
