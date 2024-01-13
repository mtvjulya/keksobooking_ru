import {
  getAdvertisement
} from './data.js';

const popup = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
//const advertsArray = getAdvertisement();

const getPhotos = (arr, newPopup) => {
  let fragment = document.createDocumentFragment();
  arr.forEach((photo) => {
    const newPhoto = newPopup.querySelector('.popup__photos').querySelector('.popup__photo').cloneNode(true);
    newPhoto.src = photo;
    fragment.appendChild(newPhoto);
  })
  newPopup.querySelector('.popup__photos').textContent = '';
  return fragment;
}

const getType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';

    case 'bungalow':
      return 'Бунгало';

    case 'house':
      return 'Дом';

    case 'palace':
      return 'Дворец';

  }
}
const getFeaturesArray = (arr, newPopup) => {
  newPopup.querySelectorAll('.popup__feature').forEach((feature) => {
    feature.style.display = 'none';
  });
  arr.forEach((arrFeature) => {
    switch (arrFeature) {
      case 'wifi':
        newPopup.querySelector('.popup__feature--wifi').style.display = 'inline-block';
        break;
      case 'dishwasher':
        newPopup.querySelector('.popup__feature--dishwasher').style.display = 'inline-block';
        break;
      case 'parking':
        newPopup.querySelector('.popup__feature--parking').style.display = 'inline-block';
        break;
      case 'washer':
        newPopup.querySelector('.popup__feature--washer').style.display = 'inline-block';
        break;
      case 'elevator':
        newPopup.querySelector('.popup__feature--elevator').style.display = 'inline-block';
        break;
      case 'conditioner':
        newPopup.querySelector('.popup__feature--conditioner').style.display = 'inline-block';
        break;
    }
  });
}
const generateAdvert = (advertsArray) => {
  let newAdvertsArr = [];
  advertsArray.forEach((advert) => {
    let newPopup = popup.cloneNode(true);
    newPopup.querySelector('.popup__title').textContent = advert.offer.title;
    newPopup.querySelector('.popup__text--address').textContent = advert.offer.address;
    newPopup.querySelector('.popup__text--price').textContent = `${advert.offer.price} ₽/ночь`;
    newPopup.querySelector('.popup__type').textContent = getType(advert.offer.type);
    newPopup.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
    newPopup.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
    // newPopup.querySelector('.popup__feature--wifi').textContent = advert.offer.features.join(', ');
    if('features' in advert.offer){
      getFeaturesArray(advert.offer.features, newPopup);

    }else{newPopup.querySelector('.popup__features').remove();}

    newPopup.querySelector('.popup__description').textContent = advert.offer.description;
    if('photos' in advert.offer){
      newPopup.querySelector('.popup__photos').appendChild(getPhotos(advert.offer.photos, newPopup));

    }else{newPopup.querySelector('.popup__photos').remove();}

    if(advert.author.avatar.length > 0 ){
      newPopup.querySelector('.popup__avatar').src = advert.author.avatar;

    }else{ newPopup.querySelector('.popup__avatar').remove()}



    newAdvertsArr.push(newPopup);
  })
  return newAdvertsArr;
};

const getAdverts = () => {
  const advertsArray = generateAdvert();
  // const addvert = advertsArray[2];
  // mapCanvas.appendChild(addvert);
  return advertsArray;
}

export {
  getAdverts, generateAdvert
};
