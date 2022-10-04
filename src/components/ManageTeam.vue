<template>
  <div class="jumbotron">
    <h1 class="display-4">Manage Team</h1>
    <p class="lead">Manage your Team for the league. </p>
    <p class="lead">Give it a name and enter your players here.</p>
    <p class="lead">You can also define the doubles and the players' position. </p>
    <hr class="my-4">
    <v-card class="mx-auto bg-blue-grey" variant="outlined">
      <v-container>
        <v-card-title class="bg-blue-grey text-white text-decoration-underline"><h1>Your Team</h1></v-card-title>
      </v-container>
      <div v-if="team">
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.name" :rules="notEmtpy" label="Teamname"></v-text-field>
                </v-container>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.double1" :rules="notEmtpy"
                                label="Double 1"></v-text-field>
                </v-container>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.double2" :rules="notEmtpy"
                                label="Double 2"></v-text-field>
                </v-container>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.double3" :rules="notEmtpy"
                                label="Double 3"></v-text-field>
                </v-container>
              </v-col>
              <v-col>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.player1" :rules="notEmtpy"
                                label="Player 1"></v-text-field>
                </v-container>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.player2" :rules="notEmtpy"
                                label="Player 2"></v-text-field>
                </v-container>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.player3" :rules="notEmtpy"
                                label="Player 3"></v-text-field>
                </v-container>
              </v-col>
              <v-col>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.player4" :rules="notEmtpy"
                                label="Player 4"></v-text-field>
                </v-container>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.player5" :rules="notEmtpy"
                                label="Player 5"></v-text-field>
                </v-container>
                <v-container>
                  <v-text-field class="bg-white" v-model="team.player6" :rules="notEmtpy"
                                label="Player 6"></v-text-field>
                </v-container>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-container>
            <v-btn @click="updateTeam" variant="outlined" :disabled="!valid" class="bg-white">Update Team</v-btn>
            <div v-if="!valid" class="text-red"><p>Please fill in all fields</p></div>
          </v-container>
        </v-card-actions>
        <v-card-actions>
          <v-container>
            <v-btn @click="deleteTeam" variant="outlined" class="bg-white">Delete Team</v-btn>
          </v-container>
        </v-card-actions>
      </div>


      <div v-else>
        <v-container>
          <strong class="text-red">You dont have a team yet - create one</strong>
        </v-container>
        <v-card-actions>
          <v-container>
            <v-btn @click="createTeam" variant="outlined">Create Team</v-btn>
          </v-container>
        </v-card-actions>
      </div>
    </v-card>
  </div>
  <div>
  </div>

</template>

<script>
import teamService from "@/services/team.service";


export default {
  name: "ManageTeam",
  data: () => ({
    team: {},
    notEmtpy: [
      v => !!v || 'Please enter a value',
    ],
    valid: true,
  }),
  mounted() {
    teamService.getTeam(this.$store.state.auth.user.id).then((response) => this.team = response.data);
  },
  methods: {
    updateTeam() {
      teamService.updateTeam(this.$store.state.auth.user.id, this.team);
    },
    deleteTeam() {
      teamService.deleteTeam(this.$store.state.auth.user.id);
      this.$router.push('/home');
    },
    createTeam() {
      this.$router.push('/addTeam');
    }
  }
}
</script>

<style scoped>

</style>