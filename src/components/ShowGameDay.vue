<template>
  <h1>GameDay1</h1>
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
  name: "ShowGameDay",
  data() {
    return {
      gameday: [],
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
  }

}
</script>

<style scoped>

</style>