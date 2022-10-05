<template>
  <div class="jumbotron">
    <v-card
        class="mx-auto"
        variant="outlined"
    >
      <v-card-title>Matches for Game: {{ gameId }}</v-card-title>
      <v-card-content>
        <v-row justify="">
          <v-col xl="9" lg="9" md="9" sm="9" xs="9">
            <v-container>
              <v-table class="bg-blue-grey" variant="outlined">
                <thead>
                <v-container>
                  <th class="text-white text-decoration-underline text-center">Match Number</th>
                </v-container>

                <th class="text-white text-center text-decoration-underline">Player1</th>
                <th class="text-white text-center text-decoration-underline">Player2</th>
                </thead>
                <tbody>
                <tr v-for="match in matches" :key="match.id">
                  <td class="text-center">{{ match.number }}</td>
                  <v-container>
                    <td>{{ match.player1 }}</td>
                  </v-container>


                  <td>{{ match.player2 }}</td>
                </tr>
                </tbody>
              </v-table>
            </v-container>
          </v-col>
        </v-row>
      </v-card-content>
      <v-card-actions>
        <v-btn @click="back" variant="outlined">back</v-btn>
      </v-card-actions>

    </v-card>


  </div>
  <div></div>

</template>

<script>
import GamedayService from "@/services/gameday.service";

export default {
  name: "ShowMatches",
  data() {
    return {
      matches: [],
      gameId: [],
    }
  },
  methods: {
    back() {
      this.$router.back();
    }
  },
  mounted() {
    this.gameId = this.$route.params.id;
    GamedayService.getMatchesByGame(this.$route.params.id).then(
        (response) => {
          this.matches = response.data;
        }
    );
  },
}
</script>

<style scoped>

</style>