<template>
<div class='root'>
  <p v-if='! video'>...waiting for video!</p>
  <div v-if='video'>
    <youtube ref='youtube' :video-id="videoId" :player-vars="playerVars" @playing="playing"></youtube>
    <button @click='videoAction("play")'>play</button>
    <button @click='videoAction("stop")'>stop</button>
  </div>
</div>
</template>
<script>
import store from '../store';
import io from 'socket.io-client';
import { YouTubeGetID } from '../helpers/helperFunctions.js';

export default {
  data: () => ({
    embeddedVideo: '',
    store,
    player: null,
      playerVars: {
      autoplay: 0,
    },
    socket: io('localhost:3001'),
  }),
  methods: {
    videoAction(action) {
      const actionParsed = action.toUpperCase();
      this.socket.emit(`${actionParsed}_VIDEO`);
    },
    playing() {
      console.log('\o/ we are watching!!!')
    }
  },
  computed: {
    videoId() {
      return YouTubeGetID(this.video);
    }
  },
  mounted() {
    this.socket.on('PLAY', () => {
      this.$refs.youtube.player.playVideo();
    });
    this.socket.on('STOP', () => {
      this.$refs.youtube.player.pauseVideo();
    });
  },
  props: ['video'],
};
</script>
