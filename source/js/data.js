import {getRandom, getRandomFixed} from './util.js';

const ADVERTISEMENT_NUMBER = 10;
const TITLES = [
  'LUX',
  'Best',
  'Paridise',
  'Sun',
  'Moon',
  'Viola',
  'Night',
  'DaySpa',
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
]
const DESCRIPTIONS = [
  'Set in Galway , 1.4 km from National University of Galway',
  'Situated in Barna, within a 5-minute walk from the village centre and a 10-minute drive from Galway',
  'Featuring lake views, Luxury 6 Bedroom Spiddal Villa, Jacuzzi, Balcony provides accommodation with a bar and a patio, around 21 km from St. Nicholas Collegiate Church.',
  'Set 7.3 km from Ashford Castle, Clós Na Feirme offers accommodation with free WiFi and free private parking.',
  'Nox Hotel Galway just off Headford Road, within walking distance of Galway city centre. Free WiFi access is available and the property offers free parking.',
  'Offering free WiFi and free private parking, Recently Renovated House in Heart of Galway City is located in Galway, within just 600 metres of Eyre Square.',
]
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const getPhotosArray = () => {
  let newPhotos = [];
  for (let i = 0; i <= getRandom(1, PHOTOS.length - 1); i++) {
    newPhotos[i] = PHOTOS[getRandom(0, PHOTOS.length - 1)];
  }
  return newPhotos;
};

const getFeaturesArray = () => {
  let features = [];
  for (let i = 0; i <= getRandom(2, FEATURES.length); i++) {
    let feature = FEATURES[getRandom(0, FEATURES.length - 1)];

    if (i === 0) {
      features.push(feature);
    }

    if (i >= 1) {
      let isSame = false;
      for (let i = 0; i < features.length; i++) {
        if (features[i] === feature) {
          isSame = true;
        }
      }
      if (!isSame) {
        features.push(feature);
      }
    }
  }
  return features;
};

const getLocation = () => {
  let location = {
    lat: getRandomFixed(35.65000, 35.70000, 5),
    lng: getRandomFixed(139.70000, 139.80000, 5),
  };
  return location;
};

const getAdvertisement = () => {
  let advertisement = [];
  for (let i = 0; i < ADVERTISEMENT_NUMBER; i++)
    advertisement[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: TITLES[getRandom(0, TITLES.length - 1)],
        address: getLocation(),
        price: getRandom(1000, 10000),
        type: TYPES[getRandom(0, TYPES.length - 1)],
        rooms: getRandom(1, 5),
        guests: getRandom(1, 10),
        checkin: TIME[getRandom(0, TIME.length - 1)],
        checkout: TIME[getRandom(0, TIME.length - 1)],
        features: getFeaturesArray(),
        description: DESCRIPTIONS[getRandom(0, DESCRIPTIONS.length - 1)],
        photos: getPhotosArray(),
      },
    }
  return advertisement;
}

export {getAdvertisement};
