<template>
  <div class="container">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Film Room</a>
        </div>
        <ul class="nav navbar-nav">
          <li class="active"><a href="#">Home</a></li>
          <li><a href="#">Page 1</a></li>
          <li><a href="#">Page 2</a></li>
          <li><a href="#">Page 3</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li v-if='store.state.USER'><a href="#"><span class="glyphicon glyphicon-user"></span> Logged in as <b>{{ chatUser }}</b></a></li>
          <li><a href="#"><google-auth @userLoggedIn='userLoggedIn'></google-auth></a></li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <div id="app">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Home from './views/Home.vue';
import store from './store';
import GoogleAuth from './components/Login';
export default {
  data: () => ({
    store,
  }),
  components: {
    Home,
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
  }
};
</script>

<style lang="scss">
</style>
