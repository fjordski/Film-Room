<template>
<div class='root'>
  <p v-if='! video'>...waiting for video!</p>
  <div v-if='video'>
    <h1>hey</h1>
    <!-- <iframe id='player' ref='player' width="560" height="315" :src='videoSrc' frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> -->
    <youtube ref='youtube' :video-id="videoId" :player-vars="playerVars" @playing="playing"></youtube>
    <button @click='playVideo'>play</button>
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
    playVideo() {
      this.socket.emit('PLAY_VIDEO');
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
