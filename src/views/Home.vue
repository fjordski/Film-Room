<template>
  <div class="root text-center">
    <div class="chat-room">
      <div class='col-xs-6 chat-box'>
        <div v-for='message in messages'>
          <b>{{ chatUser }}: </b><em> {{ message.message }}</em>
        </div>
      </div>
      <div class='col-xs-6'>
        <hr>
        <textarea v-model='message' class="form-control" placeholder='message' rows="3" @keyup.enter='sendMessage'></textarea>
        <button class='btn btn-primary pull-right mt-2' @click='sendMessage'>Send Message</button>
        <input v-model='videoID' class='form-control mt-2' type='text' placeholder='share youtube video (uri)'>
        <button class='btn btn-primary pull-right mt-2' @click='shareVideo'>Share Video</button>
        <!-- <button class='btn btn-primary pull-right mt-2' @click='downloadVideo'>Download Video</button> -->
      </div>
    </div>
    <you-tube-display ref='youTubeDisplay' :video='video'></you-tube-display>
    <!-- <video-display :video='video' :key='video'></video-display> -->
    <p>Number of users connected: {{ connectedUsers.length }}</p>
  </div>
</template>

<script>
import GoogleAuth from '../components/Login';
import YouTubeDisplay from '../components/YouTubeDisplay';
import io from 'socket.io-client';
import store from '../store';

export default {
  components: {
    GoogleAuth,
    YouTubeDisplay,
  },
  data: () => ({
    user: null,
    message: null,
    response: null,
    errorCode: null,
    url: 'localhost:3000',
    socket: io('localhost:3001'),
    messages: [],
    store,
    videoID: '',
    video: '',
    connectedUsers: [],
    videoSRC: '',
  }),
  computed: {
    chatUser() {
      const displayName = store.state.USER.displayName;
      return displayName ? displayName : 'Anonymous User';
    },
  },
  mounted() {
    this.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data];
    });
    this.socket.on('VIDEO', (data) => {
      this.video = data.video;
    });
    this.socket.emit('GET_CLIENTS');
    this.socket.on('CLIENTS', (data) => {
      this.connectedUsers = data;
    })
  },
  methods: {
    shareVideo(e) {
      e.preventDefault();
      store.commit('addYoutubeVideo', this.video);
      this.socket.emit('ADD_VIDEO', {
        video: this.videoID,
      });
    },
    // downloadVideo(e) {
    //   e.preventDefault();
    //   const URI = this.videoID;
    //   this.videoSRC = '';
    //   this.socket.emit('DOWNLOAD_VIDEO', {
    //     video: URI,
    //   });
    //   this.socket.on('VIDEO_START', (data) => {
    //     this.video = `../assets/videos/${data}.mp4`;
    //   });
    // },
    sendMessage(e) {
      e.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message,
      });
      this.message = '';
    },
  },
};
</script>
<style lang="scss">
  .mt-2 {
    margin-top: 2em;
  }

  .chat-room, .chat-box {
    height: 500px;
  }

  .chat-box {
    background-color: lightblue;
    overflow-y: auto;
  }
</style>
