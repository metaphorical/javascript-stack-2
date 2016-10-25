'use strict';
const socketIO = require('socket.io');
const fs = require('fs');

let attachEmitInterval = require('./src/socket_attachEmitInterval.js');
let randomNumberSeed = 1;
const randomNumber = () => {
    var x = Math.sin(randomNumberSeed++) * 10000;
    return x - Math.floor(x);
};

let emulationData = fs.readdirSync('./external_resources/json_routes').map((file) => {
			return require('../external_resources/json_routes/' + file).gpx.rte.rtept[0].extensions['gpxx:RoutePointExtension']['gpxx:rpt']
					.map((item) => {
						return {
							latitude: item['-lat'],
							longitude: item['-lon']
						};
					});
		});

const createSocketServer = (server) => {
	let IO = socketIO(server);


	IO.on('connection', (socket) => {
		console.log('dashboard connected');
		/**
		 * If I get time I want to extract this emulation, but it si here...
		 *
		 * Have some real routes and some randomized stuff to make for what we are missing:
		 */
		emulationData.map((statusData, index) => {
			/**
			 * "Anyone who uses arithmetic methods to produce random numbers is in a state of sin."
			 * --- John von Neumann
			 */
			let driver_id = Math.floor(randomNumber() * 1000);
			let dataToEmit = statusData.map((item) => Object.assign({}, item, {
				//there are 7 vehicles, so I want to split them to two companies
				company_id: index%2 ? 101 : 102,
				driver_id: driver_id,
				speed: 'n/a',
				accuracy: 'emulated'

			}));
			attachEmitInterval({
				data: dataToEmit,
				socket: socket,
				event: 'status-ping',
				interval: 1000 + 500 * index
			});
		});

	});
};

module.exports = createSocketServer;