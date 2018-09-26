<template>
<div class='root'>
  <p v-if='! video'>...waiting for video!</p>
  <div v-if='video'>
    <video autoplay controls>
      <source src="../assets/videos/O4PDzBnBMU4.mp4" type="video/mp4">
    </video>
  </div>
</div>
</template>
<script>
import store from '../store';

export default {
  data: () => ({
    embeddedVideo: '',
    store,
  }),
  props: ['video'],
};
</script>
