<template>
<div class='root'>
  <p v-if='! video'>...waiting for video!</p>
  <div v-if='video'>
    <h1>hey</h1>
    <!-- <iframe id='player' ref='player' width="560" height="315" :src='videoSrc' frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> -->
    <youtube ref='youtube' :video-id="videoId" :player-vars="playerVars" @playing="playing"></youtube>
    <button @click='videoAction("play")'>play</button>
    <button @click='videoAction("stop")'>stop</button>
  </div>
</div>
</template>
<script>
import store from '../store';
import io from 'socket.io-client';

export default {
  data: () => ({
    embeddedVideo: '',
    store,
    player: null,
    videoId: 'lG0Ys-2d4MA',
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
    videoSrc() {
      return `https://www.youtube.com/embed/${this.video}?enablejsapi=1`;
    },
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


const config = {
    height: 320,
    width: 400,
    videoId: '6Dc1C77nra4',
    events: {
      'onReady': onPlayerReady,
    }
