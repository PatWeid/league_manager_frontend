<template>
  <v-container>
    <v-row justify="space-around">
      <v-col xl="12" lg="12" md="12" sm="12" xs="12">
        <div class="jumbotron">
          <h1 class="display-4">Create Account</h1>
          <p class="lead">With your account you can create a team and join the league.</p>
          <hr class="my-4">

          <v-card class="bg-blue-grey">
            <v-container>
              <v-card-title class="bg-blue-grey text-white text-decoration-underline"><h1>Sign Up</h1></v-card-title>
            </v-container>
            <v-form ref="form" v-model="valid">
              <v-container>
                <v-text-field v-model="username" :rules="usernameRules" class="bg-white" label="Username"></v-text-field>
              </v-container>
              <v-container>
                <v-text-field v-model="email" :rules="emailRules" class="bg-white" label="Email"></v-text-field>
              </v-container>
              <v-container>
                <v-text-field v-model="password" :rules="passwordRules" class="bg-white" type="password" label="Password"></v-text-field>
              </v-container>
              <v-container>
                <v-btn @click="handleRegister" :disabled="!valid">Sign up</v-btn>
              </v-container>
            </v-form>
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
  name: "RegisterComponent",
  data: () => ({
    valid: true,
    username: '',
    email: '',
    password: '',
    loading: false,
    message: "",
    user: {
      username: '',
      email: '',
      password: '',
      role: ['ROLE_USER'],
    },
    usernameRules: [
      v => !!v || 'Username is required',
    ],
    emailRules: [
      v => !!v || 'Email is required',
      v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || "Password is required",
      v => ( v && v.length >= 5 ) || "Password must have at least 5 characters",
    ],
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
      this.user.email = this.email;
      this.$store.dispatch("auth/register", this.user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
            this.loading = false;
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
  },
}
</script>

<style scoped>

</style>