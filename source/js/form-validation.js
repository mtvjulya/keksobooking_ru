const form = document.querySelector('.ad-form');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const capacity = form.querySelector('#capacity');
const roomNumber = form.querySelector('#room_number');


const validateCapasity = ()=>{
  let capacityValue = capacity.options[capacity.selectedIndex].value;
  let roomNumberValue = roomNumber.options[roomNumber.selectedIndex].value;

  if (roomNumberValue == 1 && (capacityValue >= 2 || capacityValue < 1)) {
    capacity.setCustomValidity('max для 1 гостя');
  } else if (roomNumberValue == 2 && (capacityValue > 2 || capacityValue == 0)) {
    capacity.setCustomValidity('max для 2 гостей');
  } else if (roomNumberValue == 3 && capacityValue < 1) {
    capacity.setCustomValidity('max для 3 гостей');
  } else if (roomNumberValue == 100 && capacityValue >= 1) {
    capacity.setCustomValidity('не для гостей');
  }else {
    capacity.setCustomValidity('');
  }

  capacity.reportValidity();
};
price.addEventListener('input',()=>{
  if(type.value === 'bungalow' && price.value < 0){
    price.setCustomValidity('«Бунгало» — минимальная цена за ночь 0');
  }else if(type.value === 'flat' && price.value < 1000){
    price.setCustomValidity('«Квартира» — минимальная цена за ночь 1 000');
  }else if(type.value === 'house' && price.value < 5000){
    price.setCustomValidity('«Дом» — минимальная цена 5 000');
  }else if(type.value === 'palace' && price.value < 10000){
    price.setCustomValidity('«Дворец» — минимальная цена 10 000');
  }else{
    price.setCustomValidity('');
  }
  price.reportValidity();
});

roomNumber.addEventListener('input',()=>{
  validateCapasity();
});

capacity.addEventListener('input',()=>{
  validateCapasity();
});

