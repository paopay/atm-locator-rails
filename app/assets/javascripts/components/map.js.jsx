/**
 * custom functions all begin with
 *  an underscore for clarification 
**/

// this component contains all elements
// and components for the map page
var MapBox = React.createClass({
    // this is a very hacky way of sending lat and lng vars
    // to the server. so far, this is the only way i've
    // found to extract coordinates from within the
    // getCurrentPosition function without using the
    // even 'hackier' setTimeout.
    _handleClick: function(e) {
        e.preventDefault();
        var lat, lng;

        function requestCurrentPosition() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(useGeoData);
            }
        }

        function useGeoData(position){
            lng = position.coords.longitude;
            lat = position.coords.latitude;
            onLocationReady();
        }

        function onLocationReady() {
            console.log(lat, lng);
            $.ajax({
                url: '/find-location',
                data: {'lat': lat, 'lng': lng},
                method: 'POST',
                success: function(data) {
                    console.log('success');

                },
                error: function(xhr, status, err) {
                    console.error(url, status, err.toString());
                }.bind(this)
            });
        }

        requestCurrentPosition();
    },
    // if the coords have been loaded in it renders the map
    // otherwise, it will render the 'find atm' button 
	render: function() {
        if (false) {
            return (
                <div className="mapBox">
                    <GoogleMap url="https://m.chase.com/PSRWeb/location/list.action?" />
                </div>
            );
        } else {
            return (
                <div className="mapBox">
                    <button className="find-btn center-block btn btn-primary" type="submit" onClick={this._handleClick}>
                        Find the nearest Chase ATM
                    </button>
                </div>
            );
        }
    }
});

var GoogleMap = React.createClass({
    // when the component loads it calls the
    // initializeMap function
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
