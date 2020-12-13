//API from https://wheretheiss.at
//Leaflet.js: https://leafletjs.com

//----- Making a map and tiles -----//
const mymap = L.map('issMap').setView([0, 0], 3);//([lat, lon], zoom level)
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//We wrap the attribution with object because it's expect form of Object.
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);

//Altanative: In this way I have to get my mapbox access token
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'your.mapbox.access.token'
// }).addTo(mymap);


//----- Making a marker with a custom icon -----//
const issIcon = L.icon({
    iconUrl: 'iss200.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap);

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
async function getISS(){
  const response = await fetch(api_url);
  const data = await response.json();
  // console.log(data);
  const {latitude, longitude, velocity} = data;
  marker.setLatLng([latitude, longitude]);//Reposition the icon
  mymap.setView([latitude, longitude]);//Reposition centre of the map to the iss

  document.getElementById('lat').textContent = latitude.toFixed(2)+"°";
  document.getElementById('lon').textContent = longitude.toFixed(2)+"°";
  document.getElementById('vel').textContent = velocity.toFixed(2)+" km/h";
  // toFixed: Set the number of digits to appear after the decimal point
}

getISS();

setInterval(getISS, 1000);
