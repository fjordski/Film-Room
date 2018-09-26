<template>
  <div class="root">
    <span v-if='! store.state.USER' class="glyphicon glyphicon-log-in" @click='googleAuth'> Login</span>
    <span v-if='store.state.USER' class="glyphicon glyphicon-log-in" @click='logOut'> Logout</span>
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
