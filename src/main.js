import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueYoutube from 'vue-youtube'

import * as firebase from "firebase";
import VueFirebase from 'vue-firebase'

const FBCONFIG = {
  apiKey: "AIzaSyAesf5GKaCAlSThVoUYisdfvoKykCFCcHU",
  authDomain: "trash-pandas.firebaseapp.com",
  databaseURL: "xxx",
  projectId: "trash-pandas",
  storageBucket: "xxx",
  messagingSenderId: "xxx"
};

Vue.use(VueFirebase, { firebase: firebase, config: FBCONFIG });
Vue.use(VueYoutube);

Vue.config.productionTip = false;

const EventBus = new Vue();

new Vue({
  router,
  store,
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('we got a user')
      } else {
        console.log('no see')
        // this.$router.push('/auth')
      }
     });
  },
  render: h => h(App),
}).$mount('#app');
