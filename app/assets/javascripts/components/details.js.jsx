// collection of atm detail cards
//
// using bootstrap tabs for easy transition 
// between each atm location
//
// i would've broken this component down in to
// smaller and more manageable components with more time
var DetailCard = React.createClass({
	render: function() {
		var atm = this.props.data
		// hacky way to get a unique id for atm without
		// having to escape the period for lat which is a float
		var atmId = atm.lat.replace(/\./g,'');

		var services = atm.services.join('\n');
		console.log(services);
		// code here is hacky and redundant since
		// react, unfortunately, does not allow inline scripting
		// except for single line statements
		//
		// i would have liked to work out the conditions outside
		// of the template given more time
		if (typeof atm.lobbyHrs !== 'undefined') {		
			return (
				<div role="tabpanel" className="tab-pane row" id={atmId}>
					<div className="col-md-12 details margin-t20">
						<div className="col-md-8 col-md-offset-2">
							<h4>Location Details</h4>
							<div className='col-md-6'>
								<b><p>{atm.label}</p>
								<p>{atm.address}</p>
								<p>{atm.city}, {atm.state} {atm.zip}</p>
								<p>{atm.phone}</p></b>
							</div>
							<div className='col-md-6'>
								<p><b>Type:</b> {atm['type']}</p>
								<p><b>Distance:</b> {atm.distance}</p>
							</div>
						</div>
						<div className='col-md-8 col-md-offset-2'>
							<h4>Branch Hours</h4>
							<div className='col-md-12'>
								<table className='branch-hours'>
								  <tr>
								    <th>Monday</th>
								    <th>Tuesday</th> 
								    <th>Wednesday</th>
								    <th>Thursday</th>
								    <th>Friday</th>
								    <th>Saturday</th>
								    <th>Sunday</th>
								  </tr>
								  <tr>
								    <td>{atm.lobbyHrs[1]}</td>
								    <td>{atm.lobbyHrs[2]}</td> 
								    <td>{atm.lobbyHrs[3]}</td>
								    <td>{atm.lobbyHrs[4]}</td>
								    <td>{atm.lobbyHrs[5]}</td>
								    <td>{atm.lobbyHrs[6]}</td>
								    <td>{atm.lobbyHrs[0] === "" ? "Closed" : atm.lobbyHrs[0]}</td>
								  </tr>
								</table>
							</div>
						</div>
						<div className='col-md-8 col-md-offset-2'>
							<h4>ATM Information</h4>
							<div className='col-md-6'>
								<p><b>Number of ATMs:</b> {atm.atms}</p>
							</div>
							<div className='col-md-6'>
								<p><b>Services:</b> {atm.services.length > 0 ? services : ""}</p>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div role="tabpanel" className="tab-pane row" id={atmId}>
					<div className="col-md-12 details margin-t20">
						<div className="col-md-8 col-md-offset-2">
							<h4>Location Details</h4>
							<div className='col-md-6'>
								<b><p>{atm.label}</p>
								<p>{atm.address}</p>
								<p>{atm.city}, {atm.state} {atm.zip}</p>
								<p>{atm.phone}</p></b>
							</div>
							<div className='col-md-6'>
								<p><b>Type:</b> {atm['type']}</p>
								<p><b>Distance:</b> {atm.distance}</p>
							</div>
						</div>
						<div className='col-md-8 col-md-offset-2'>
							<h4>ATM Information</h4>
							<div className='col-md-6'>
								<p><b>Number of ATMs:</b> {atm.atms}</p>
								<p><b>{atm.services.length > 0 ? "Services:" + atm.services.join('\n') : ""}:</b> {atm.distance}</p>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
});
