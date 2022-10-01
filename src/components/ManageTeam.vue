<template>
<h1>Manage team</h1>
  <div v-if="team">
    <v-text-field v-model="team.name" label="Teamname"></v-text-field>
    <v-text-field v-model="team.double1" label="Double 1"></v-text-field>
    <v-text-field v-model="team.double2" label="Double 2"></v-text-field>
    <v-text-field v-model="team.double3" label="Double 3"></v-text-field>
    <v-text-field v-model="team.player1" label="Player 1"></v-text-field>
    <v-text-field v-model="team.player2" label="Player 2"></v-text-field>
    <v-text-field v-model="team.player3" label="Player 3"></v-text-field>
    <v-text-field v-model="team.player4" label="Player 4"></v-text-field>
    <v-text-field v-model="team.player5" label="Player 5"></v-text-field>
    <v-text-field v-model="team.player6" label="Player 6"></v-text-field>
    <v-btn @click="updateTeam">Update Team</v-btn>
    <v-btn @click="deleteTeam">Delete Team</v-btn>
  </div>
  <dive v-else>
    <h1>You dont have a team yet - create one</h1>
    <v-btn @click="createTeam">Create Team</v-btn>

  </dive>

</template>

<script>
import teamService from "@/services/team.service";


export default {
  name: "ManageTeam",
  data: () => ({
    team: {},
  }),
  mounted() {
    teamService.getTeam(this.$store.state.auth.user.id).then((response) => this.team = response.data);
    // this.team = teamService.getTeam(this.$store.state.auth.user.id);
  },
  methods: {
    updateTeam() {
      console.log('update team');
      teamService.updateTeam(this.$store.state.auth.user.id, this.team);
      // this.$router.go(0);
    },
    deleteTeam() {
      teamService.deleteTeam(this.$store.state.auth.user.id);
      this.$router.push('/team');
    },
    createTeam() {
      this.$router.push('/addTeam');
    }
  }
}
</script>

<style scoped>

</style>