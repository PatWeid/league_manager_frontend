<template>
  <div class="jumbotron">
    <h1 class="display-4">Current League</h1>
    <p class="lead">Here you can see which team plays against who on each game day</p>
    <hr class="my-4">
    <div v-if="gameday">
      <v-select
          :items="items"
          label="Select Gameday"
          variant="outlined"
          v-model="selectedGameDay"
          @update:modelValue="handleSelect"
      ></v-select>
      <v-card class="mx-auto" variant="outlined">
        <v-card-title>GameDay {{ selectedGameDay }}</v-card-title>
        <v-card-subtitle>{{ gamedayDate }}</v-card-subtitle>
        <v-card-item>
          <v-container>
            <v-table class="bg-blue-grey" variant="outlined">
              <thead>
              <v-container>
                <th class="text-white text-decoration-underline text-center">Game ID</th>
              </v-container>
              <th class="text-white text-center text-decoration-underline">Teams</th>
              </thead>
              <tbody>
              <tr v-for="game in gameday" :key="game.id">
                <v-container>
                  <td>{{ game.id }}</td>
                </v-container>
                <v-container>
                  <v-table v-for="team in game.teams" :key="team.id">
                    <v-container>
                      <td>{{ team.name }}</td>
                    </v-container>
                  </v-table>
                </v-container>
                <td>
                  <v-btn @click="showMatches(game.id)">Show Matches</v-btn>
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-container>
        </v-card-item>
      </v-card>
    </div>
    <div v-else>
      <v-row>
        <v-col>
          <div class="text-left">
            <h1>Currently there is no League created.</h1>
            <h3>Please wait until the admin creates one.</h3>
          </div>
        </v-col>
        <v-col>
          <v-img>
            <v-img
                class="bg-white"
                :aspect-ratio="1"
                height="300px"
                src="../assets/sad_cat.jpeg"
                cover
            ></v-img>
          </v-img>
        </v-col>
      </v-row>
    </div>
  </div>
  <v-container>
  </v-container>

</template>

<script>
import GamedayService from "@/services/gameday.service";

export default {
  name: "ShowLeague",
  data() {
    return {
      gameday: [],
      matches: [],
      selectedGameDay: 1,
      gamedayDate: new Date(),
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
  },
  mounted() {
    GamedayService.getGameDay(1).then(
        (response) => {
          this.gameday = response.data.games;
          if (this.gameday != null) {
            this.gamedayDate = response.data.date.substring(0, 10);
          }
        }
    );
  },
  methods: {
    getGameDay() {
      GamedayService.getGameDay(this.selectedGameDay).then(
          (response) => {
            this.gameday = response.data.games;
            this.gamedayDate = response.data.date.substring(0, 10);
          }
      );
    },
    handleSelect() {
      this.getGameDay();
    },
    showMatches(id) {
      this.$router.push({
        name: "showMatches",
        params: {
          id: id,
        }
      })
    }
  }

}
</script>

<style scoped>


</style>