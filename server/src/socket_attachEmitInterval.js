'use strict';
/**
 * Rough method to attach interval that controls cycling through
 * route coordinates and emitting them at certain interval
 */
let attachEmitInterval = function(options) {
	let counter = 0;
	let data = options.data;

	setInterval(() => {
		if(counter <= data.length-1) {
			options.socket.emit(options.event, data[counter]);
			counter++;
		} else {
			counter = 0;
			options.socket.emit(options.event, data[counter]);
			counter++;
		}
	}, options.interval);
};

module.exports = attachEmitInterval;