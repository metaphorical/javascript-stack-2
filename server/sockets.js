'use strict';
const socketIO = require('socket.io');

let attachEmitInterval = require('./src/socket_attachEmitInterval.js');

const createSocketServer = (server) => {
	let IO = socketIO(server);

	// Socket.io
	IO.on('connection', (socket) => {
	console.log('user connected');
	let statusData = [
		{
			name: 'one'
		},
		{
			name: 'two'
		},
		{
			name: 'three'
		}
	];

	attachEmitInterval({
		data: statusData,
		socket: socket,
		event: 'status-ping',
		interval: 1500
	});

	});
};

module.exports = createSocketServer;