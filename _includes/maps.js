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
  scrollWheelZoom: false,
  attribution: 'The OPEN'
}).setView([20, 0], 2);
var map2 = L.mapbox.map('map2', 'mapbox.streets', {
  scrollWheelZoom: false,
  attribution: 'The OPEN'
}).setView([20, 0], 2);

// add all the pins to the layer and make them clickable
var pins = L.mapbox.featureLayer().addTo(map1);
pins.setGeoJSON(orgs);
pins.on('click', function(e) {
  map1.panTo(e.layer.getLatLng());
});

// ### Map 2 ###

// build the index of the different campaign groupings
//   (with one sample group containing everyone)
var sampleArray = ['USA','CAN','GBR','DEU','IRL','POL','AUT','ISR','SWE','CHE','AUS','NZL','ZAF','COL','VEN','ITA','ROU'];
var campaigns = {
{% for story in site.case_studies %}
{% unless story.hidden %}
  '{{ story.slug }}': {
    'list': {{ story.map_countries }}
  },
{% endunless %}
{% endfor %}
  'sample': {
    'list': sampleArray
  }
};

//
var campaignLayers = {};
$(document).ready(function() {
  $.each(campaigns, function(name, list) {
    campaignLayers[name] = L.mapbox.featureLayer(world, {
      style: { weight: 1.5, fillOpacity: '0' },
      //className: 'country-tpp',
      filter: function(feature, layer) {
        if(campaigns[name].list.indexOf(feature.id) != -1) {
          return true;
        }
        return false;
      }
    }).setZIndex(-1).addTo(map2);
  });
  $('#campaign-list > li > a').on('mouseover', function() {
    campaignLayers[this.dataset.campaign].setStyle({fillOpacity: 0.7});
  })
  .on('mouseout', function() {
    campaignLayers[this.dataset.campaign].setStyle({fillOpacity: 0});
  })
  .on('click', function() {
    // $('.tabs .' + this.dataset.campaign)
  });
});

</script>
