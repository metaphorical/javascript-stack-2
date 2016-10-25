import React from 'react';
import { Example } from '../../components/exampleModule';
import { MapChart } from '../../components/mapChart';

module.exports = function() {
	this.styles = require('./dashboard.css');
	return (
		<div className={this.styles.container}>
			<div className={this.styles.half}>
				<MapChart appData={this.props.appData} />
			</div>
			<div className={this.styles.half}>
				<Example appData={this.props.appData} />
			</div>
		</div>
	);
};