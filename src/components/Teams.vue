<template>
  <div>
    <h2>Teams</h2>
    <ul>
      <li v-for="team in teams" :key="team.id">
        <label>{{ team.name }}
          <input 
          type="checkbox"
          :checked="$store.state.userTeamIds.indexOf(team.id) !== -1"
          @change="$store.commit('toggleUserTeamId', team.id)"
        ></label>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        localUserIds: []
      }
    },
    computed: {
      teams () {
        return this.$store.state.teams
      },
      userTeams () {
        return this.$store.getters.userTeams
      }
    }
  }
</script>
