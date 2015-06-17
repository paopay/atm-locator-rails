/**
 * custom functions all begin with
 *  an underscore for clarification 
**/

// this component contains all elements
// and components for the map page
var MapBox = React.createClass({
	render: function() {
		return (
			<div className="mapBox">
				<GoogleMap url="https://m.chase.com/PSRWeb/location/list.action?" />
            </div>
        );
    }
});

var GoogleMap = React.createClass({
    componentDidMount: function () {
    	this._initializeMap();
    },
    // sets up the map with specified options
    // and pins the users current location
    _initializeMap: function() {
        var self = this;
        var mapOptions = {
            zoom: 14
        };

        var map = new google.maps.Map(this.getDOMNode(), mapOptions);

    	if(navigator.geolocation) {
    		navigator.geolocation.getCurrentPosition(function(position) {
	    	    var pos = new google.maps.LatLng(position.coords.latitude,
	    	                                     position.coords.longitude);

	    	    var infowindow = new google.maps.InfoWindow({
	    	     	map: map,
	    	     	position: pos,
	    	     	content: 'You'
	    	    });

	    	    map.setCenter(pos);

                // self._loadLocationsFromApi(pos.A, pos.F);
	    	}, function() {
	    	    this._handleNoGeolocation(true);
	    	});
    	} else {
	    	// browser doesn't support Geolocation
	    	this._handleNoGeolocation(false);
    	}
        this.setState({map: map});
    },
    // handles errors when geolocation is not supported
    _handleNoGeolocation: function(errorFlag) {
    	if (errorFlag) {
    		var content = 'Error: The Geolocation service failed.';
    	} else {
    		var content = 'Error: Your browser doesn\'t support geolocation.';
    	
	    	var options = {
	    		map: map,
	    		position: new google.maps.LatLng(60, 105),
	    		content: content
	    	}	

	    	var infowindow = new google.maps.InfoWindow(options);
	    	map.setCenter(options.position);
	    }
    },
    // loads the atm/branch locator and
    // saves the data as the components property
    _loadLocationsFromApi: function(lat, lng) {
        var url = this.props.url + "lat=" + lat + "&lng=" + lng;
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                console.log(data);
                this.setState({
                    data: data 
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
        	<div className='googleMap'></div>
        );
    }
});
