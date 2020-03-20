const socket = io.connect();

socket.on('new', podIndex => {
  const el = document.createElement('li');
  el.innerHTML = 'New connection from podIndex: ' + podIndex;
  document.querySelector('ul').appendChild(el);
});
