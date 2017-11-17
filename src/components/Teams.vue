<template>
  <div class="insulate wrap">
    <h3 v-if="!localUserIds">Pick some teams</h3>
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
    <button v-if="teams.length" class="button" @click="viewFixtures">See the fixtures</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        localUserIds: this.$store.state.userTeamIds.length
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

    methods: {
      viewFixtures () {
        this.$store.commit('setFilter', true)
        this.$router.push({ name: 'Home' })
      }
    }
  }
</script>

<style>
  .team:nth-child(4n) {
    border-bottom: 1px solid #D0ECE1;
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
    transition: 300ms background-color, 300ms color, 300ms padding;
  }

  .team label:before,
  .team label:after {
    content: '';
    position: absolute;
    background-color: #D0ECE1;
    transform: rotate(-45deg);
    transition: 300ms transform, 300ms background-color;
    width: 0.9375em;
    height: 0.125em;
    right: 0;
    top: 15px;
  }

  .team label:after {
    transform: rotate(45deg);
  }

  .team input:checked + label {
    background: #47CB94;
    padding-right: 10px;
    padding-left: 10px;
    color: #FFF;
  }

  .team input:checked + label:after {
    transform: translateX(-5px) translateX(-0.4375em) translateY(0.1875em) rotate(45deg) scaleX(0.4);
  }

  .team input:checked + label:before {
    transform: translateX(-5px) rotate(-45deg);
  }

  .team input:checked + label:before,
  .team input:checked + label:after {
    background-color: #FFF;
  }

  .see-fixtures {
    color: inherit;
    font: inherit;
  }

</style>
