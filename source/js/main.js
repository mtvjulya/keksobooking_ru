import leaflet from 'leaflet';
import {fillForm} from './form.js';
import {disableForm} from './disabled-state.js';
import {loadMap, loadMarkers, clearArr} from './map.js';
import { showAlert } from './alertMessage.js';
import {activateForm, activateFilters } from './active-state.js';

import './form-validation.js';

const filterForm = document.querySelector('.map__filters');
const houseTypeFilter = filterForm.querySelector('#housing-type');
const housePrice = filterForm.querySelector('#housing-price');
let currentMarkers = [];

fillForm();
disableForm();
const debounce = (cb,timeout)=>{
  setTimeout(()=>cb(),timeout);
}

// const getMarkerRank = (arr)=>{
//   let rank = 0;

//   if (arr.offer.type === houseTypeFilter.value) {
//   if (arr.offer.price < 10000 ) {
//     rank += 10;
//   }
//   if(arr.offer.price > 50000 ) {
//     rank += 10;
//   }
//   if(arr.offer.price <= 50000 && arr.offer.price >= 10000) {
//     rank += 10;
//   }

//   return rank;
// }

// const sortMarkers = (markerA, markerB) => {
//   const rankA = getMarkerRank(markerA);
//   const rankB = getMarkerRank(markerB);

//   return rankB - rankA;
// }

const changeFlter = (arr, currentMarkers)=>{
  const newArr = arr.slice();
  filterForm.addEventListener('change',(evt)=>{
    evt.preventDefault();

    let valuePriceFilter = housePrice.value;
    let valueHouseFilter = houseTypeFilter.value;
    clearArr(currentMarkers);
    if(valuePriceFilter ==='any'){
      if(valueHouseFilter === 'any'){
        loadMarkers(newArr.slice(0,10)) ;
      }else{
        const arrF = newArr.filter((houseTypeArr)=> {
          return (houseTypeArr.offer.type === valueHouseFilter);
        });
        loadMarkers(arrF) ;
      }
    }else if(valueHouseFilter === 'any'){
      loadMarkers(newArr.slice(0,10)) ;
    }else{
      if(valuePriceFilter === 'middle'){
        const arrF = newArr.filter((houseTypeArr)=> {
          return (houseTypeArr.offer.price >= 10000 && houseTypeArr.offer.price <= 50000 && houseTypeArr.offer.type === valueHouseFilter);
        });
        loadMarkers(arrF) ;
      }else if(valuePriceFilter === 'low'){
        const arrF = newArr.filter((houseTypeArr)=> {
          return (houseTypeArr.offer.price < 10000 && houseTypeArr.offer.type === valueHouseFilter);
        });
        loadMarkers(arrF) ;
      }else if(valuePriceFilter === 'high'){
        const arrF = newArr.filter((houseTypeArr)=> {
          return (houseTypeArr.offer.price > 50000 && houseTypeArr.offer.type === valueHouseFilter);
        });
        loadMarkers(arrF) ;

      }else{
        valueHouseFilter = houseTypeFilter.value;
        const arrF = newArr.filter((houseTypeArr)=> {
          return (houseTypeArr.offer.type === valueHouseFilter);
        });
        loadMarkers(arrF) ;
      }

    }
  })

}


const filterArr = (arr,currentMarkers)=>{
  let newArr = arr.slice();
  debounce(()=>changeFlter(newArr, currentMarkers),500);

};

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response)=>response.json())
  .then((response) => {
    loadMap(response.slice().slice(0,10));
    currentMarkers = loadMarkers(response.slice().slice(0,10));
    filterArr(response,currentMarkers);
    activateFilters();
  })
  .catch(()=>{
    showAlert('Не удалось получить объявления');
    activateForm();

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
      activateForm();
      document.querySelector('#address').value = getLocation(mainPinMarker.getLatLng());
    })
      .setView({
        lat: 35.652832,
        lng: 139.839478,
      }, 10);
      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
      ).addTo(map);

      mainPinMarker.addTo(map);

      mainPinMarker.on('moveend', (evt) => {
        let obj = evt.target.getLatLng();
        document.querySelector('#address').value = getLocation(obj);

      });
  })

