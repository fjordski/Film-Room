import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueYoutube from 'vue-youtube'
import Vuetify from 'vuetify'

import * as firebase from "firebase";
import VueFirebase from 'vue-firebase'

const FBCONFIG = {
  apiKey: "",
  authDomain: "trash-pandas.firebaseapp.com",
  databaseURL: "xxx",
  projectId: "trash-pandas",
  storageBucket: "xxx",
  messagingSenderId: "xxx"
};

Vue.use(VueFirebase, { firebase: firebase, config: FBCONFIG });
Vue.use(VueYoutube);
Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/');
      } else {
        this.$router.push('/auth');
      }
    });
  },
  render: h => h(App),
}).$mount('#app');
