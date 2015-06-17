// collection of atm detail cards
//
// using bootstrap tabs for easy transition 
// between each atm location
var DetailCard = React.createClass({
	render: function() {
		// hacky way to get a unique id for atm without
		// having to escape the period for lat which is a float
		var atmId = this.props.data.lat.replace(/\./g,'');
		return (
				<div role="tabpanel" className="tab-pane" id={atmId}>
					{this.props.data.lat}
					{this.props.data.lng}
				</div>
		);
	}
});

