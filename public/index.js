const socket = io();
socket.on('hi', () => {
  const el = document.createElement('li');
  el.innerHTML = 'New connection';
  document.querySelector('ul').appendChild(el);
});
