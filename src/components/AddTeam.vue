<template>
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
  <v-btn @click="createTeam">Create Team</v-btn>
  <v-btn @click="cancel">Cancel</v-btn>
</template>

<script>
import teamService from "@/services/team.service";

export default {
  name: "AddTeam",
  data: () => ({
    team: {},
  }),
  methods: {
    createTeam() {
      teamService.createTeam(this.$store.state.auth.user.id, this.team);
      this.$router.back();
    },
    cancel() {
      this.$router.back();
    }
  },
}
</script>

<style scoped>

</style>