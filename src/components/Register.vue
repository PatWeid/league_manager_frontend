<template>
  <v-container>
    <v-row justify="space-around">
      <v-col  xl="4" lg="4" md="4" sm="12" xs="12">
        <v-card title="Sign Up">
          <v-form ref="form">
            <v-text-field v-model="username" label="Username"></v-text-field>
            <v-text-field v-model="email" label="Email"></v-text-field>
            <v-text-field v-model="password" type="password" label="Password"></v-text-field>
            <v-btn @click="handleRegister">Sign up</v-btn>
          </v-form>
        </v-card>
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
      this.user.email = this.email;

      console.log('user: ' + this.user.password);
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