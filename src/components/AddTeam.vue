<template>
  <div class="jumbotron">
    <h1 class="display-4">Create Team</h1>
    <p class="lead">Create your Team for the league. </p>
    <p class="lead">Give it a name and enter your players here.</p>
    <p class="lead">You can also define the doubles and the players' position. </p>
    <hr class="my-4">
    <v-card class="mx-auto bg-blue-grey" variant="outlined">
      <v-container>
        <v-card-title class="bg-blue-grey text-white text-decoration-underline"><h1>Create Team</h1></v-card-title>
      </v-container>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row justify="space-around">
              <v-col xl="4" lg="4" md="4" sm="12" xs="12">
                <v-container>
                  <v-text-field class="bg-white" v-model="team.name" :rules="notEmpty" label="Teamname"></v-text-field>
                </v-container>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.double1" :rules="notEmpty"
                                label="Double 1"></v-text-field>
                </v-container>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.double2" :rules="notEmpty"
                                label="Double 2"></v-text-field>
                </v-container>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.double3" :rules="notEmpty"
                                label="Double 3"></v-text-field>
                </v-container>
              </v-col>
              <v-col xl="4" lg="4" md="4" sm="12" xs="12">
                <v-container>
                  <v-text-field class="bg-white" v-model="team.player1" :rules="notEmpty"
                                label="Player 1"></v-text-field>
                </v-container>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.player2" :rules="notEmpty"
                                label="Player 2"></v-text-field>
                </v-container>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.player3" :rules="notEmpty"
                                label="Player 3"></v-text-field>
                </v-container>
              </v-col>
              <v-col xl="4" lg="4" md="4" sm="12" xs="12">
                <v-container>
                  <v-text-field class="bg-white" v-model="team.player4" :rules="notEmpty"
                                label="Player 4"></v-text-field>
                </v-container>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.player5" :rules="notEmpty"
                                label="Player 5"></v-text-field>
                </v-container>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.player6" :rules="notEmpty"
                                label="Player 6"></v-text-field>
                </v-container>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-container>
            <v-btn @click="createTeam" variant="outlined" :disabled="!valid" class="bg-white">Create Team</v-btn>
            <div v-if="!valid" class="text-red"><p>Please fill in all fields</p></div>
          </v-container>
        </v-card-actions>
        <v-card-actions>
          <v-container>
            <v-btn @click="cancel" variant="outlined" class="bg-white">Cancel</v-btn>
          </v-container>
        </v-card-actions>

    </v-card>
  </div>
  <div>
  </div>

</template>

<script>
import teamService from "@/services/team.service";

export default {
  name: "AddTeam",
  data: () => ({
    team: {},
    notEmpty: [
      v => !!v || 'Please enter a value',
    ],
    valid: true,
  }),
  methods: {
    createTeam() {
      teamService.createTeam(this.$store.state.auth.user.id, this.team);
      alert('Team created');
      this.$router.push('/team');
    },
    cancel() {
      this.$router.back();
    }
  },
}
</script>

<style scoped>

</style>