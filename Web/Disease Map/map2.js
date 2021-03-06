var firebaseref = new Firebase("https://lawrencechengproject.firebaseio.com/");

// In the following example, markers appear when the user clicks on the map.
      // The markers are stored in an array.
      // The user can then click an option to hide, show or delete the markers.
      var map;
      var markers = [];
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var labelIndex = 0;

function initMap() {
  
    var haightAshbury = {lat: 37.769, lng: -122.446};

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: haightAshbury,
          mapTypeId: google.maps.MapTypeId.TERRAIN
        });

         map.addListener('click', function(event) {
          addMarker(event.latLng);
        });
  };

   function addMarker(location) {
        var contentString = "Infectious Case Detected";
        var infowindow = new google.maps.InfoWindow({
          content: contentString });

        var marker = new google.maps.Marker({
          position: location,
          draggable: true,
          animation: google.maps.Animation.DROP,
          map: map,
          label: labels[labelIndex++ % labels.length] //For when it loops back to "A"
        });
        //marker.addListener('click', toggleBounce);
        marker.addListener('click', function(){infowindow.open(map,marker);
        });
        markers.push(marker);
        //distance(); 
        //gives the notification everytime you put down a marker
        //firebaseAdd();
      }

  map.addListener('click', function(e) {
  var marker = new google.maps.Marker({
    position: {lat: e.latLng.lat(), lng: e.latLng.lng()},
    map: map
  });
  var latlng = {lat: e.latLng.lat(), lng: e.latLng.lng()};

  firebaseref.push({
  title: "Hello World!",
  author: "Firebase",
  location: {
    city: "San Francisco",
    state: "California",
    zip: 94103, lat: e.latLng.lat(), lng: e.latLng.lng()
  }
  });  
  //firebaseref.push({lat: e.latLng.lat(), lng: e.latLng.lng()})

  firebaseref.on("child_added", function(snapshot, prevChildKey) {
  // Get latitude and longitude from Firebase.
  var newPosition = snapshot.val();

  // Create a google.maps.LatLng object for the position of the marker.
  // A LatLng object literal (as above) could be used, but the heatmap
  // in the next step requires a google.maps.LatLng object.
  var latLng = new google.maps.LatLng(newPosition.lat, newPosition.lng);

  // Place a marker at that location.
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  });

// Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
        labelIndex=0;
      }

      //Remember to clear the marker from the screen even after removing it from the array
      function deleteLastMarker() {
        markers[markers.length-1].setMap(null);
        markers.pop();
        labelIndex--;
      }


      /*function getRad(x) {
          return x * Math.PI / 180;
      }*/

      var risk = 0;
      function infectionLevel1()
      {
         risk = 3;
         //alert("test 1" + risk);
         alert("R0 is the Basic Reproductive Number, which measures the infectivity of diseases. For instance, Ebola (one of the least infectious) has an R0 of 1.5-2.5, while Measles (one of the most infectious) has an R0 of 12-18");
      }

      function infectionLevel2()
      {
         risk = 10;
         //alert("test 2" + risk);
         alert("R0 is the Basic Reproductive Number, which measures the infectivity of diseases. For instance, Ebola (one of the least infectious) has an R0 of 1.5-2.5, while Measles (one of the most infectious) has an R0 of 12-18");
      }

      function infectionLevel3()
      {
         risk = 16;
         //alert("test 2" + risk);
         alert("R0 is the Basic Reproductive Number, which measures the infectivity of diseases. For instance, Ebola (one of the least infectious) has an R0 of 1.5-2.5, while Measles (one of the most infectious) has an R0 of 12-18");
      }

      var dangerCount = 0; //number of points in the danger zone, a certain distance from an initial marker
      var dist = []; //holds the distances from the initial point for the markers added 
      var bearCoor = []; //Holds the bearing coordinates for the disease points

      //Make it so you don't have to press the button everytime for it to register!
      function distance() {
        //var p1 = {lat: 250, lng: 250};
        //var p2 = {lat: 500, lng: 500};
        //for (int i = 1; i++; i<markers.length)
        //{
          //var dist = [];
          var i = markers.length-1;//Use the distance from the last array added to the first
          var p1 = {lat:markers[0].getPosition().lat(),lng: markers[0].getPosition().lng()};
          var p2 = {lat:markers[i].getPosition().lat(),lng: markers[i].getPosition().lng()};
          var R = 6378137; // Earth’s mean radius in meter
          var dLat = (p2.lat - p1.lat)*(Math.PI / 180);
          var dLong =(p2.lng - p1.lng)*(Math.PI / 180);
          //var a = Math.sin(dLat/2)*Math.sin(dLat / 2)+Math.cos((p1.lat*(Math.PI / 180)));
          var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((p1.lat*(Math.PI / 180))) * Math.cos((p2.lat*(Math.PI / 180))) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c;

          
          if (d<5000) //if the distance is within 5000m from the initial point
          {
            dangerCount++;
          }

          dist.push(d);
          //return d and put it into the array; // returns the distance in meter
         //alert("Test");
         //google.maps.geometry.spherical.computeDistanceBetween (latLng1, latLng2)

        //var degrees = getDegrees(p1.lat, p1.lng, p2.lat, p2.lng);
        //getDegrees(20, 50, 70, 90);
        //alert(degrees);

        //var bearing = getBearing(p1.lat, p1.lng, p2.lat, p2.lng);
        bearCoor[i] = getBearing(p1.lat, p1.lng, p2.lat, p2.lng);


        var baseline = 2500; //Average number of people within a 5000 radius circle in an area in the U.S.

        if (dangerCount%5==0) //each marker represents ten infected people
        {
          //infectionLevel()
          var numInfected = (risk*(dangerCount*10))+(dangerCount*10);
          var infectionChance = numInfected/baseline;
          var percent = infectionChance*100;
          var sum = 0;
          for( var i = 0; i < bearCoor.length; i++ ){
              sum += bearCoor[i]; //don't forget to add the base
          }
          var avgBearing = (sum/bearCoor.length)+20;
          /*alert("Chance of being infected in this area: " + percent + "%" + "Trend Direction:" + degrees);*/
           alert("Chance of being infected in this area: " + percent + "%  \n" + "Trend Direction (Bearing): " + avgBearing + " degrees");
          
        }
      
      }

  
function radians(n) {
  return n * (Math.PI / 180);
}
function degrees(n) {
  return n * (180 / Math.PI);
}

//Gets the direction that the disease is moving in as a compass bearing
function getBearing(startLat,startLong,endLat,endLong){
  startLat = radians(startLat);
  startLong = radians(startLong);
  endLat = radians(endLat);
  endLong = radians(endLong);

  var dLong = endLong - startLong;

  var dPhi = Math.log(Math.tan(endLat/2.0+Math.PI/4.0)/Math.tan(startLat/2.0+Math.PI/4.0));
  if (Math.abs(dLong) > Math.PI){
    if (dLong > 0.0)
       dLong = -(2.0 * Math.PI - dLong);
    else
       dLong = (2.0 * Math.PI + dLong);
  }

  return (degrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
}
      
      //var dist = [];

      function newInfectionArea()
      {
          

      }


      function clearDatabase()
      {
          firebaseref.remove();

      }


      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }

  
  var firebaseref = new Firebase("https://lawrencechengproject.firebaseio.com/");
  var i = 0;  


});
}


