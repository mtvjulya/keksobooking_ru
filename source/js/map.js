import {
  activateForm
} from './active-state.js';
import { getAdvertisement } from './data.js';
import {generateAdvert} from './addverts.js';
import { failMessage } from './alertMessage.js';
import { request } from './fetch.js';

//const advertisementArr = getAdvertisement();

//request(generateAdvert,failMessage,'GET');

const filterForm = document.querySelector('.map__filters');
const houseTypeFilter = filterForm.querySelector('#housing-type');


const form = document.querySelector('.ad-form');
const getLocation = (obj) => {
  return 'location.' + obj.lat.toFixed(5) + ', location.' + obj.lng.toFixed(5);
};


//main pin marker
const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({
  lat: 35.652832,
  lng: 139.839478,
}, {
  draggable: true,
  icon: mainPinIcon,
},
);
const map = L.map('map-canvas').on('load', () => {

  form.querySelector('#address').value = getLocation(mainPinMarker.getLatLng());
})
  .setView({
    lat: 35.652832,
    lng: 139.839478,
  }, 10);

const arrMarkers = [];
const loadMarkers = (arr)=>{
  let advertisementPopupArr = generateAdvert(arr.slice(0,10));
  let points = arr.map((value) => {
    return {
      //title: value.offer.title,
      lat: value.location.lat,
      lng: value.location.lng,
    }
  });

  points.forEach(({lat,lng},index) => {
    const icon = L.icon({
      iconUrl: '/img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker({
      lat,
      lng,
    }, {
      icon,
    },
    );
    arrMarkers.push(marker);
    marker.addTo(map).bindPopup(advertisementPopupArr[index]);


  });
  return arrMarkers;
};

const clearArr = (advertisementArr)=>{

  advertisementArr.forEach((mark)=>{
    map.removeLayer(mark);
  })
}

const loadMap = (advertisementArr) => {


 //debugger;
  activateForm();
  // loadMarkers(advertisementArr);
  //debugger;

  // let advertisementPopupArr = generateAdvert(advertisementArr);
  // loadMarkers(advertisementArr).forEach((marker,index)=>{
  //   marker.addTo(map).bindPopup(advertisementPopupArr[index]);
  // });





  // const map = L.map('map-canvas').on('load', () => {
  //   activateForm();
  //   form.querySelector('#address').value = getLocation(mainPinMarker.getLatLng());
  // })
  //   .setView({
  //     lat: 35.652832,
  //     lng: 139.839478,
  //   }, 10);

  //additional markers


  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    let obj = evt.target.getLatLng();
    form.querySelector('#address').value = getLocation(obj);

  });
  const resetFormButton = document.querySelector('.ad-form__reset');
  const resetForm = ()=>{
    document.querySelector('.map__filters').reset();
    mainPinMarker.setLatLng(L.latLng(35.652832,139.839478)) ;
  };

  resetFormButton.addEventListener('click',resetForm);
}


export {  loadMap, loadMarkers, map, clearArr };
