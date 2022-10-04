<template>
  <div class="jumbotron">
    <v-card class="bg-blue-grey">
      <v-container>
        <v-card-title><h1 class="text-white text-decoration-underline">Your Profile</h1></v-card-title>
      </v-container>
      <hr>
      <v-card-item>
        <v-container>
          <strong>Username: </strong>{{ currentUser.username }}
        </v-container>
        <v-container>
          <strong>ID: </strong>{{ currentUser.id }}
        </v-container>
        <v-container>
          <strong>E-Mail: </strong>{{ currentUser.email }}
        </v-container>
        <v-container>
          <strong>Token: </strong>{{ currentUser.accessToken.substring(0, 20) }} ...
          {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
        </v-container>
        <v-container>
          <strong>Authorities:</strong>
          <v-container>
            <ul>
              <li v-for="role in currentUser.roles" :key="role">{{ role }}</li>
            </ul>
          </v-container>
        </v-container>
      </v-card-item>
    </v-card>
  </div>
  <div class="container">


  </div>
</template>
<script>
export default {
  name: 'ProfileComponent',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
