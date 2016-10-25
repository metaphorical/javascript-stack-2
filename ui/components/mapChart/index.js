"use strict";

import React from 'react';
import { findDOMNode } from 'react-dom';
import Immutable from 'immutable';


var MapChartView = React.createClass({
    getInitialState() {
		return {
			renderMap: false,
			mapData: null,
			//By default we show positions and then we switch to see paths when pressing button
			showPositions: true
		};
    },

    componentWillMount() {
        this.view = require('./mapChart.jsx');
    },
	getMapMarkerData() {
		return {
			features: Object.keys(this.props.appData).map((key) => {
				return Object.keys(this.props.appData[key])
				.map((listKey) => this.props.appData[key][listKey][this.props.appData[key][listKey].length-1])
				.map((entry) => {
					return {
							geometry: {
								"type": "Point",
								"coordinates": [+entry.longitude, +entry.latitude]
							},
							"type": "Feature"
							};
					});
				}).reduce((a, b) => {
					return a.concat(b);
				}, []),
			type: "FeatureCollection"
		};
	},
	getMapLineData() {
		return {
			features: Object.keys(this.props.appData).map((key) => {
				return Object.keys(this.props.appData[key])
				.map((listKey) => this.props.appData[key][listKey])
				.map((statusList) => {
					return {
							geometry: {
								"type": "LineString",
								"coordinates": statusList.map(entry => [+entry.longitude, +entry.latitude])
							},
							"type": "Feature"
							};
					});
				}).reduce((a, b) => {
					return a.concat(b);
				}, []),
			type: "FeatureCollection"
		};
	},
    componentDidMount() {
		var domNode = findDOMNode(this);
		this.height = domNode.clientHeight;
		this.width = domNode.clientWidth;

		// set your zoom scale
		this.scale = 1000 * 4;
		// min and max of your zoom scale
		this.scaleExtent = [1 << 10, 1 << 11];
		// set your center point
		this.center = [14.589844, 52.268157];
		// set your popupContent
		this.popupContent = function(d) { return d.properties.text; };

		this.setState({
			mapData: this.state.showPositions ? this.getMapMarkerData() : this.getMapLineData(),
			// mapData: this.getMapMarkerData(),
			renderMap: true
		});


    },
	toggleMode() {
		this.setState({
			showPositions: this.state.showPositions === false
		});
	},
	componentDidUpdate() {
		// var mapData = this.getMapMarkerData();
		var mapData = this.state.showPositions ? this.getMapMarkerData() : this.getMapLineData();
		var stateMapData = this.state.mapData;
		if(!Immutable.fromJS(mapData).equals(Immutable.fromJS(stateMapData || {}))) {
			// console.log(JSON.stringify(mapData, null,4));
			// console.log('MAP DATA', mapData);
			// console.log(this.getMapLineData());
			this.setState({
				mapData: mapData
			});
		}
		// console.log(this.getMapData());
	},

    render() {
        return this.view();
    }
});

export const MapChart = MapChartView;