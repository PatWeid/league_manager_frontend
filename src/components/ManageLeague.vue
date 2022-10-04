<script setup>
import Datepicker from 'vue3-datepicker'
</script>

<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-4">Manage League</h1>
      <p class="lead">Here you can create or delete the league.</p>
      <p class="lead">Just select nine teams that should participate in the league from the list.</p>
      <p class="lead">You can also choose the dates of the game days. </p>
      <hr class="my-4">
      <v-card class="mx-auto" variant="outlined">
        <v-card-title>Create League</v-card-title>
        <v-card-subtitle>select teams and dates for league</v-card-subtitle>
        <v-card-item>
          <v-row>
            <v-col>
              <v-container>
                <v-table class="bg-blue-grey" variant="outlined">
                  <thead>
                  <v-container>
                    <th class="text-white text-decoration-underline text-center">Team ID</th>
                  </v-container>
                  <th class="text-white text-center text-decoration-underline">Teamname</th>
                  </thead>

                  <tbody>
                  <tr v-for="team in allTeams" :key="team.id">
                    <v-container>
                      <td>{{ team.id }}</td>
                    </v-container>
                    <td>{{ team.name }}</td>
                    <td>
                      <v-btn @click="addTeamToLeague(team)">Add</v-btn>
                    </td>
                  </tr>
                  </tbody>

                </v-table>
              </v-container>

              <v-container>
                <v-card class="bg-blue-grey">
                  <v-card-title class="text-white text-decoration-underline">Select Date</v-card-title>
                  <v-container>
                    <datepicker v-model="datePicker" aria-label="test"></datepicker>
                  </v-container>
                  <v-card-actions>
                    <v-btn @click="addDateToLeague" variant="outlined" class="bg-white">Add Date</v-btn>
                  </v-card-actions>

                </v-card>
              </v-container>
            </v-col>


            <v-col>
              <v-container>
                <v-table class="bg-blue-grey" variant="outlined">
                  <thead>
                  <v-container>
                    <th class="text-white text-decoration-underline text-center">Teams for League</th>
                  </v-container>
                  </thead>

                  <tbody>
                  <tr v-for="team in addedTeams" :key="team.id">
                    <v-container>
                      <td>{{ team.name }}</td>
                    </v-container>
                  </tr>
                  </tbody>

                </v-table>
              </v-container>
            </v-col>

            <v-col>
              <v-container>
                <v-table class="bg-blue-grey" variant="outlined">
                  <thead>
                  <v-container>
                    <th class="text-white text-decoration-underline text-center">Dates for Gamedays</th>
                  </v-container>
                  </thead>

                  <tbody>
                  <tr v-for="date in addedDates" :key="date">
                    <v-container>
                      <td>{{ date.toString().substring(0,15) }}</td>
                    </v-container>
                  </tr>
                  </tbody>

                </v-table>
              </v-container>
            </v-col>
          </v-row>
        </v-card-item>

        <v-card-actions>
          <v-btn @click="resetSelection" variant="outlined">Reset selection</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn variant="outlined" @click="createLeague" :disabled="!isValid">Create League</v-btn>
        </v-card-actions>
        <v-card-actions>
          <div v-if="!isValid" class="text-red"><p>Select 10 teams and 9 dates</p></div>
        </v-card-actions>
        <v-card-actions>
          <v-btn variant="outlined" @click="deleteLeague">Delete League</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
  <div class="form-group">
    <div v-if="message" class="alert alert-danger" role="alert">
      {{ message }}
    </div>
  </div>
</template>
<script>
import TeamService from "@/services/team.service";
import LeagueService from "@/services/league.service";
export default {
  name: "ManageLeague",
  data() {
    return {
      allTeams: [],
      selectedID: "",
      selectedDate: {},
      addedTeams: [],
      addedDates: [],
      addedIDs: [],
      addedDatesMillis: [],
      datePicker: new Date(),
      ids: [],
      dates: [],
      data: {
        ids: [],
        dates: [],
      },
      message:"",
    };
  },
  computed: {
    isValid: function () {
      return this.addedTeams.length === 10 && this.addedDates.length === 9;
    }
  },
  methods: {
    addID() {
      this.ids.push(this.selectedID);
      console.log('all IDs: ' + this.ids);
    },
    addDate() {
      // this.selectedDate.setHours(3,0,0,0);
      this.dates.push(this.selectedDate.getTime());
      console.log('all Dates: ' + this.dates);
    },
    createLeague() {
      this.data.ids = this.addedIDs;
      this.data.dates = this.addedDatesMillis;
      console.log('data:');
      console.log(JSON.stringify(this.data));
      LeagueService.createLeague(this.data).then(
          (response) => {
            this.message = response.data;
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
    deleteLeague() {
      LeagueService.deleteLeague();
      LeagueService.deleteLeague().then(
          (response) => {
            this.message = response.data;
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
    addTeamToLeague(team) {
      this.addedTeams.push(team);
      this.addedIDs.push(team.id);
    },
    addDateToLeague() {
      this.addedDates.push(this.datePicker);
      this.addedDatesMillis.push(this.datePicker.getTime());
    },
    resetSelection() {
      this.addedTeams = [];
      this.addedDates = [];
      this.addedIDs = [];
      this.addedDatesMillis = [];
    },
  },
  mounted() {
    TeamService.getAllTeams().then(
        (response) => {
          this.allTeams = response.data;
        },
        (error) => {
          this.allTeams =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
  },
};
</script>