const socket = io.connect();

socket.on('hi', podIndex => {
  const el = document.createElement('li');
  el.innerHTML = 'New connection from podIndex: ' + podIndex;
  document.querySelector('ul').appendChild(el);
});
