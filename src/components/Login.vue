<template>
  <div class="root">
    <v-btn small v-if='! store.state.USER' @click='googleAuth'> Login</v-btn>
    <v-btn small v-if='store.state.USER' @click='logOut'> Logout</v-btn>
  </div>
</template>
<script>
import * as firebase from 'firebase';
import store from '../store';

const provider = new firebase.auth.GoogleAuthProvider();

export default {
  data: () => ({
    store,
  }),
  methods: {
    logOut() {
      store.commit('removeUser');
    },
    googleAuth() {
      this.$firebase.auth().signInWithPopup(provider).then(result => {
        const token = result.credential.accessToken;
        store.state.USER = result.user;
        this.$emit('userLoggedIn');
      }).catch(function(error) {
        console.log(error)
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.email;
        // const credential = error.credential;
      });
    },
  },
};
</script>
