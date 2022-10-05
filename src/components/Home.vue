<template>
  <v-row justify="space-around">
    <v-col xl="12" lg="12" md="12" sm="12" xs="12">
      <div class="container">
        <header class="jumbotron">
          <h1 class="text-center">Welcome to the League Manager</h1>
          <v-container>
            <v-img
                class="bg-white"
                :aspect-ratio="1"
                height="300px"
                src="../assets/Header_tt_Picutre.jpeg"
                cover
            ></v-img>
          </v-container>
          <p>Welcome to the League Manager. It helps you to manage your table tennis team. Just sign up and create your
            team.</p>
          <p>When created a team you can participate at the league.</p>
          <p>More cool features will come soon ;)</p>
        </header>
      </div>
    </v-col>
  </v-row>

</template>
<script>
export default {
  name: "HomeComponent",
  data() {
    return {
      content: "",
    };
  },
  mounted() {

  },
};
</script>
