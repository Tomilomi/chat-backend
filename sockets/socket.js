// sockets/index.js
export function socketHandler(io) {
  io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    socket.on('chat message', (msg) => {
      console.log('Mensaje recibido:', msg);
      io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado:', socket.id);
    });
  });
}
