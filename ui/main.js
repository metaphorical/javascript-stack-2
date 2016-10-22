import IO from 'socket.io-client';

//connecting to same port that is serving the page, so no need ot pass anything to IO

let socket = IO();

socket.on('connect', () => {
	console.log('CONNECTED!');
});
socket.on('status-ping', (data) => {
	console.log(data);
});
