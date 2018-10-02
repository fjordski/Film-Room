<template>
<div class="container-fluid">
  <div id="app">
    <div class="pull-right">
      <span v-if='store.state.USER'><v-icon>person_pin</v-icon> Logged in as <b>{{ chatUser }}</b></span>
      <google-auth></google-auth>
    </div>
    <router-view></router-view>
  </div>
</div>
</template>
<script>
import store from './store';
import GoogleAuth from './components/Login';
export default {
  data: () => ({
    store,
  }),
  components: {
    GoogleAuth,
  },
  computed: {
    chatUser() {
      const displayName = store.state.USER.displayName;
      return displayName ? displayName : 'Anonymous User';
    },
  },
  methods: {
    userLoggedIn() {
      console.log('ya');
    },
  },
};
</script>

<style lang="scss">
</style>
