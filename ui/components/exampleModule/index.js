"use strict";

import React from 'react';
import Immutable from 'immutable';

var ExampleView = React.createClass({
    getInitialState() {
		return {
			counters: null
		};
    },

    componentWillMount() {
		try {
        	this.view = require(`./dom/${this.props.uiId}.example.jsx`);
		} catch(e) {
        	this.view = require('./dom/base.example.jsx');
		}
    },
	getCounterData() {
		return Object.keys(this.props.appData).map((key) => {
			return { count : Object.keys(this.props.appData[key])
			.map((listKey) => this.props.appData[key][listKey].length)
			.reduce((a, b) => {
				return a + b;
			}, 0),
			title: 'Company ' + key};
		});
	},
    componentDidMount() {
    },
	componentDidUpdate() {
		let counters = this.getCounterData();
		let stateCounters = this.state.counters;
		if(!Immutable.fromJS(counters).equals(Immutable.fromJS(stateCounters || {}))) {
			this.setState({
				counters: counters
			});
		}
	},

    render() {
        return this.view();
    }
});

export const Example = ExampleView;