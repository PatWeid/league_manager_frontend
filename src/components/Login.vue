<template>
  <v-container>
    <v-row justify="space-around">
      <v-col xl="12" lg="12" md="12" sm="12" xs="12">
        <div class="jumbotron">
          <h1 class="display-4">Log into your Account</h1>
          <p class="lead">When logged in you can use the league manager.</p>
          <hr class="my-4">

          <v-card class="bg-blue-grey">
            <v-container>
              <v-card-title class="bg-blue-grey text-white text-decoration-underline"><h1>Login</h1></v-card-title>
            </v-container>
              <v-container>
                <v-text-field v-model="username" class="bg-white" label="Username"></v-text-field>
              </v-container>
              <v-container>
                <v-text-field v-model="password"  class="bg-white" type="password" label="Password"></v-text-field>
              </v-container>
              <v-container>
                <v-btn @click="handleRegister">Login</v-btn>
              </v-container>
          </v-card>
        </div>

      </v-col>
    </v-row>
  </v-container>


        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
</template>
<script>
export default {
  name: "LoginComponent",
  components: {},
  data: () => ({
    username: '',
    password: '',
    successful: false,
    loading: false,
    message: "",
    user: {
      username: '',
      password: '',
    }
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.user.username = this.username;
      this.user.password = this.password;

      this.$store.dispatch("auth/login", this.user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
            this.loading = false;
            this.$router.push("/home");
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.successful = false;
            this.loading = false;
          }
      );
    },
  }
}
</script>
<style scoped>
</style>
