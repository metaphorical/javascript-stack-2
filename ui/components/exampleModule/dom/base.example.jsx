import React from 'react';

module.exports = function() {
	try {
		this.styles = require(`../styles/${this.props.uiId}.example.css`);
	} catch(e) {
		this.styles = require(`../styles/base.example.css`);
	}
	return (this.props.appData ?
			<div className={this.styles.container}>
				<h1> Activity counters </h1>
				{this.state.counters ?
						this.state.counters.map((counter, key) => {
							return (
								<div key={key}>
									<h2>{counter.title}</h2>
									<p>{counter.count}</p>
								</div>
							);
						})
				: ''}
			</div>
			:
			<div className={this.styles.container}>
				 <h1>Please feed me </h1>
			</div> );
};