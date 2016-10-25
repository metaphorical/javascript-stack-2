import React from 'react';
import { Map, MarkerGroup, LineGroup } from 'react-d3-map';

module.exports = function() {

	this.styles = require('./mapChart.css');

	return (<div className={this.styles.container}>
				<button onClick={this.toggleMode} className={this.styles.button}>Toggle Map Mode</button>
				{ this.state.renderMap ?
					<Map
						width= {this.width}
						height= {this.height}
						scale= {this.scale}
						scaleExtent= {this.scaleExtent}
						center= {this.center}
					>
					{this.state.showPositions ?
						<MarkerGroup
							key= {"polygon-test"}
							data= {this.state.mapData}
							popupContent= {this.popupContent}
							markerClass= {this.styles.marker}
						/>
						:
						this.state.mapData.features.map((geodata, i) =>{
							// console.log(geodata)
							return <LineGroup
								key= {"line-test-" + i}
								data= {geodata}
								popupContent= {this.popupContent}
								meshClass= {this.styles.line}
							/>;
						})
					}
					</Map>
					: '' }
			</div> );
};