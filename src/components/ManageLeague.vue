<script setup>
import Datepicker from 'vue3-datepicker'
import ShowGameDay from "@/components/ShowGameDay";
</script>

<template>
  <div class="container">
    <header class="jumbotron">
      <p>List with all teams here</p>
    </header>
  </div>
  <body>
  <v-text-field v-model="selectedID" label="insert ID"></v-text-field>
  <v-btn @click="addID">Add ID</v-btn>
  <datepicker v-model="selectedDate"></datepicker>
  <v-btn @click="addDate">Add Date</v-btn>
  <v-btn @click="createLeague">Create League</v-btn>
  <v-btn @click="deleteLeague">Delete League</v-btn>
  <ShowGameDay></ShowGameDay>
  </body>
</template>
<script>
import TeamService from "@/services/team.service";
import LeagueService from "@/services/league.service";
export default {
  name: "ManageLeague",
  data() {
    return {
      content: "",
      selectedID: "",
      selectedDate: {},
      ids: [],
      dates: [],
      data: {
        ids: [],
        dates:[],
      },
    };
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
      this.data.ids = this.ids;
      this.data.dates = this.dates;
      LeagueService.createLeague(this.data);
    },
    deleteLeague() {
      LeagueService.deleteLeague();
    }
  },
  mounted() {
    TeamService.getAllTeams().then(
        (response) => {
          this.content = response.data;
        },
        (error) => {
          this.content =
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