/**
 * custom functions all begin with
 *  an underscore for clarification 
**/

// this component contains all elements
// and components for the map page
var MapBox = React.createClass({
    // setting the atmLocations state to undefined allows the component to
    // keep track when the state changes to contain relevant data
    getInitialState: function() {
        return {
            atmLocations: undefined
        };
    },
    _handleClick: function(e) {
        e.preventDefault();
        var lat, lng;
        var self = this;

        function requestCurrentPosition() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(useGeoData);
            } else {
                // browser doesn't support Geolocation
                this._handleNoGeolocation(false);
            }
        }

        // this is a very hacky way of sending lat and lng vars
        // to the server. so far, this is the only way i've
        // found to extract coordinates from within the
        // getCurrentPosition function without using the
        // even 'hackier' setTimeout.
        function useGeoData(position) {
            lng = position.coords.longitude;
            lat = position.coords.latitude;
            onLocationReady();
        }

        // sends coordinates to server while the server
        // parses the data, queries the chase api and returns
        // with new data containing the atm locations
        function onLocationReady() {
            $.ajax({
                url: '/find-location',
                data: {'lat': lat, 'lng': lng},
                method: 'POST',
                success: function(data) {
                    self.setState({
                        atmLocations   : data['atm_locations'],
                        lat            : data['lat'],
                        lng            : data['lng']
                    });
                },
                error: function(xhr, status, err) {
                    console.error(url, status, err.toString());
                }
            });
        }

        requestCurrentPosition();
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
    // if the coords have been loaded in from the server
    // it rerenders with the map otherwise, it
    // will just render the 'find atm' button 
	render: function() {
        if (typeof this.state.atmLocations !== 'undefined') {
            var lat = this.state.lat,
                lng = this.state.lng,
                url = "https://m.chase.com/PSRWeb/location/list.action?lat=" + lat + "&lng=" + lng;

            return (
                <div className="mapBox">
                    <GoogleMap url={url} atmLocations={this.state.atmLocations} lat={lat} lng={lng} />
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
        var atmLocations = this.props.atmLocations.locations;
        var mapOptions = {
            zoom: 14,
            center: new google.maps.LatLng(this.props.lat, this.props.lng)
        };

        // initializes map with options above and also
        // pins map canvas to the dom element created in render
        var map = new google.maps.Map(this.getDOMNode(), mapOptions);

        // shows info window for current location
	    var myInfowindow = new google.maps.InfoWindow({
	     	map: map,
	     	position: mapOptions.center,
	     	content: 'You'
	    });

        var atmInfowindow = new google.maps.InfoWindow();

        // pinning markers and setting up details for each location
        // that is near the user's location
        for(var i=0; i < atmLocations.length; i++) {
            var atm = atmLocations[i];

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(atm.lat, atm.lng),
                map: map
            });

            google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
                return function() {
                    // atm needs to be reset inside the closure so that
                    // the scope pertains to the proper element in the
                    // atmLocations object
                    var atm = atmLocations[i];
                    var details = atm.address;
                    atmInfowindow.setContent(details);
                    atmInfowindow.open(map, marker);
                }
            })(marker, i));
        }

        // sets map to state so it can be accessed by self
        // or child components
        this.setState({map: map});
    },
    render: function () {
        return (
        	<div className='googleMap'></div>
        );
    }
});
