"use strict";

import React from 'react';

var DashboardView = React.createClass({
    getInitialState() {
		return null;
    },

    componentWillMount() {
        this.view = require('./dashboard.jsx');
    },

    componentDidMount() {
    },
	componentDidUpdate() {
		// console.log('ping');
		// console.log(this.props.appData);
	},

    render() {
        return this.view();
    }
});

/**
*  Exporting a factory because it is a prefared way of calling react element
*
*  Also, directly calling react component when parsing to string (for server side rendering)
*  causes an error
*/
export const Dashboard = React.createFactory(DashboardView);