import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    USER: '',
    YOUTUBE_URI: '',
    USER_LIST: [],
  },
  mutations: {
    removeUser(state) {
      state.USER = '';
    },
    addYoutubeVideo(state, URI) {
      state.YOUTUBE_URI = URI;
    },
    addSocketUser(state, user) {
      state.USER_LIST.push(user);
    },
  },
  actions: {

  },
});
