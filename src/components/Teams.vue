<template>
  <div>
    <h2>Teams</h2>
    <ul class="teams">
      <li class="team" v-for="team in teams" :key="team.id">
        <input 
          type="checkbox"
          :id="team.id"
          :checked="$store.state.userTeamIds.indexOf(team.id) !== -1"
          @change="$store.commit('toggleUserTeamId', team.id)"
        >
        <label :for="team.id">{{ team.name }}</label>
      </li>
    </ul>
    <wc-footer>
      <router-link to="/">See the fixtures</router-link>
    </wc-footer>
  </div>
</template>

<script>
  import WcFooter from './Wc-Footer'
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
    },

    components: {
      WcFooter
    }
  }
</script>

<style>
  .team:nth-child(4n) {
    border-bottom: 1px solid #FFF;
    padding-bottom: 10px;
    margin-bottom: 5px;
  }

  .team input {
    position: absolute !important;
    clip: rect(1px, 1px, 1px, 1px);
  }

  .team label {
    -webkit-tap-highlight-color: transparent;
    display: block;
    position: relative;
    cursor: pointer;
    padding: 5px 0;
    margin: 0;
  }

  .team label:before,
  .team label:after {
    content: '';
    position: absolute;
    background-color: #C56368;
    transform: rotate(-45deg);
    transition: 300ms transform, 300ms background-color;
    width: 15px;
    height: 2px;
    right: 0;
    top: 17px;
  }

  .team label:after {
    transform: rotate(45deg);
  }

  .team input:checked + label:after {
    transform: translateX(-7px) translateY(3px) rotate(45deg) scaleX(0.4);
  }

  .team input:checked + label:before,
  .team input:checked + label:after {
    background-color: #FFFFFF;
  }

</style>
