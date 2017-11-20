import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import data from '@/assets/data'

Vue.use(Vuex)
let fetchingPosts = false

export default new Store({
  state: {
    days: [],
    teams: [],
    games: [],
    error: '',
    userTeamIds: [],
    filter: null,
    init: false
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
        commit('addTeams', data)
        commit('addGames', data)
        commit('addDays', data)
      }
    }
  },

  mutations: {
    addDays (state, { games }) {
      state.games.forEach(game => {
        const date = new Date(game.date)
        const dateKey = `${date.getMonth()}${date.getDate()}`
        let index = state.days.findIndex(d => d.key === dateKey)
        if (index === -1) {
          state.days.push({ key: dateKey, games: [] })
          index = state.days.findIndex(d => d.key === dateKey)
        }
        state.days[index].games.push(game)
      })
    },
    addGames (state, { games }) {
      games.forEach(game => {
        game.id = game.name.replace(/\s/g, '-').replace('---', '-').toLowerCase()

        game.teamOne = state.teams.find(t => t.id === game.teamOneId)
        game.teamTwo = state.teams.find(t => t.id === game.teamTwoId)

        if (game.teamOne && game.teamTwo) {
          game.title = game.teamOne.name + ' v. ' + game.teamTwo.name
        } else {
          game.title = game.name
        }
        state.games.push(game)
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
    },
    setInit (state) {
      state.init = true
      localStorage.setItem('witwco_userInit', true)
    }
  }
})
