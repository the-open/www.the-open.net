<script src="https://api.mapbox.com/mapbox.js/v2.2.3/mapbox.js"></script>
<link href="https://api.mapbox.com/mapbox.js/v2.2.3/mapbox.css" rel="stylesheet" />
<script>

var orgs = [{% include orgs.js %}];
var world = {
  "type": "FeatureCollection",
  "features": {% include countryshapes.json %}
};

L.mapbox.accessToken = 'pk.eyJ1Ijoic25vb2siLCJhIjoiY2loN2Z4OXlhMHE4c3Vla3RiYjUzOHAxMSJ9.etz4qL0ffKTyPf2bFcHOIA';
var map1 = L.mapbox.map('map1', 'mapbox.streets', {
  scrollWheelZoom: false
}).setView([20, 0], 2);
var map2 = L.mapbox.map('map2', 'mapbox.streets', {
  scrollWheelZoom: false,
  attribution: 'The OPEN'
}).setView([20, 0], 2);

var pins = L.mapbox.featureLayer().addTo(map1);
pins.setGeoJSON(orgs);
pins.on('click',function(e) {
  map1.panTo(e.layer.getLatLng());
});

var sampleArray = ['USA','CAN','GBR','DEU','IRL','POL','AUT','SWE','CHE','AUS','NZL','ZAF','COL','VEN','ITA','ROU'];
var campaigns = {
  'refugees': {
    'list': ['USA','CAN','GBR','DEU','IRL','POL','AUT','SWE','CHE','AUS','NZL','ITA','ROU']
  },
  'coal': {
    'list': ['GBR','DEU','AUS']
  },
  'trade': {
    'list': ['USA','CAN','AUS','NZL','GBR','DEU','IRL','POL','AUT','SWE','CHE','ITA','ROU']
  },
  'peace': {
    'list': ['USA','CAN','NZL','GBR','DEU','CHE','SWE','AUT','IRL']
  }
};
var campaignLayers = {};
$(document).ready(function() {
$.each(campaigns, function(name, list) {
  campaignLayers[name] = L.mapbox.featureLayer(world, {
    style: { weight: 2, fillOpacity: '0' },
    //className: 'country-tpp',
    filter: function(feature, layer) { if(campaigns[name].list.indexOf(feature.id) != -1) return true; return false;}
  }).setZIndex(-1).addTo(map2);
});
$('#campaign-list > li > a').on('mouseover', function(){
  campaignLayers[this.dataset.campaign].setStyle({fillOpacity: 1});
});
$('#campaign-list > li > a').on('mouseout', function(){
  campaignLayers[this.dataset.campaign].setStyle({fillOpacity: 0});
});
});

</script>
