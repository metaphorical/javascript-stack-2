'use strict';
const socketIO = require('socket.io');
const createSocketServer = (server) => {
	let IO = socketIO(server);

	// Socket.io
	IO.on('connection', (socket) => {
	console.log('user connected');

	setInterval(() => {
		socket.emit('status-ping', { hello: 'world' });
	}, 1500);

	});
};

module.exports = createSocketServer;