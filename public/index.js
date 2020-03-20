const socket = io.connect();
const form = document.querySelector('form');
const input = document.querySelector('input');

socket.on('new', podIndex => {
  const li = document.createElement('li');
  li.innerHTML = 'New connection from podIndex: ' + podIndex;
  document.querySelector('.connections').appendChild(li);
});

socket.on('msg', msg => {
  const li = document.createElement('li');
  li.innerHTML = msg;

  document.querySelector('.messages').appendChild(li);
});

form.addEventListener('submit', e => {
  e.preventDefault();
  socket.emit('msg', input.value);
  input.value = '';
});
