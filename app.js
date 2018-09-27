const express = require('express');
const fs = require('fs');
const youtubedl = require('youtube-dl');
const app = express();
const ss = require('socket.io-stream');

const server = app.listen(3001, function() {
  console.log('server running on port 3001');
});


const io = require('socket.io')(server);

io.on('connect', onConnect);

function YouTubeGetID(url){
  url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

function onConnect(socket) {
  socket.on('GET_CLIENTS', () => {
    io.clients((error, clients) => {
      if (error) throw error;
        io.emit('CLIENTS', clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
    });
  });

  socket.on('SEND_MESSAGE', message => {
    io.emit('MESSAGE', message)
  });

  socket.on('ADD_VIDEO', video => {
    io.emit('VIDEO', video);
  });

  socket.on('PLAY_VIDEO', () => {
    io.emit('PLAY');
  });

  socket.on('STOP_VIDEO', () => {
    io.emit('STOP');
  });
};
