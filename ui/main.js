import IO from 'socket.io-client';
import { createStore } from 'redux';


let addStatus = (statusObject) => {
	return {
		type: 'ADD_STATUS',
		status: statusObject
	};
};

let statusReducer = (state = {}, action) => {
		switch(action.type) {
			case 'ADD_STATUS':
					var newState = Object.assign({}, state);
					if(state[action.status.company_id]) {
						if(state[action.status.company_id][action.status.driver_id]) {
							newState[action.status.company_id][action.status.driver_id].push(action.status);
						} else {
							newState[action.status.company_id][action.status.driver_id] = [action.status]
						}
					} else {
						newState[action.status.company_id] = {[action.status.driver_id] : [action.status]}
					}
					return newState;
			break;

		}
};

let store = createStore(statusReducer);

//For now I am not using unsubscribe, but am making it available.
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

//connecting to same port that is serving the page, so no need ot pass anything to IO

let socket = IO();

socket.on('connect', () => {
	console.log('CONNECTED!');
});

socket.on('status-ping', (data) => {
	store.dispatch(addStatus(data));
});
