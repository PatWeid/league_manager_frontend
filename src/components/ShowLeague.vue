<template>
  <h1>GameDay1</h1>
  <v-text-field v-model="selectedGameDay" label="Select GameDay"></v-text-field>
  <v-btn @click="getGameDay">Get Gameday</v-btn>
  <v-container>
    <v-table>
      <thead>
      <th class="text-left">Game ID</th>
      <th class="text-left">Teams</th>
      </thead>
      <tbody>
      <tr v-for="game in gameday" :key="game.id">
        <td>{{ game.id }}</td>
        <td>
          <v-container>
            <v-table v-for="team in game.teams" :key="team.id">
              <td>{{team.name}}</td>
            </v-table>
          </v-container>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-container>

</template>

<script>
import GamedayService from "@/services/gameday.service";

export default {
  name: "ShowLeague",
  data() {
    return {
      gameday: [],
      selectedGameDay: 1,
    }
  },
  mounted() {
    GamedayService.getGameDay(1).then(
        (response) => {
          this.gameday = response.data.games;
        },
        (error) => {
          this.gameday =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
  },
  methods: {
    getGameDay() {
      console.log('get GameDay ' + this.selectedGameDay);
      GamedayService.getGameDay(this.selectedGameDay).then(
          (response) => {
            this.gameday = response.data.games;
          },
          (error) => {
            this.gameday =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
  }

}
</script>

<style scoped>

</style>