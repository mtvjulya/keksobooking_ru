import { request } from './fetch.js';
import {successMessage, failMessage} from './alertMessage.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const form = document.querySelector('.ad-form');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');
const avatarInput = form.querySelector('#avatar');
const avatarPreview = form.querySelector('.ad-form-header__preview > img');
const photoInput = form.querySelector('#images');
const photoPreview = form.querySelector('.ad-form__photo');

const changeType = ()=>{
  type.addEventListener('change', () => {
    switch (type.value) {
      case 'bungalow':
        price.placeholder = '0';
        price.min = 0;
        break;
      case 'flat':
        price.placeholder = '1000';
        price.min = 1000;
        break;
      case 'house':
        price.placeholder = '5000';
        price.min = 5000;
        break;
      case 'palace':
        price.placeholder = '10000';
        price.min = 10000;
        break;
    }
  });
};

const changeTime = ()=>{
  timein.addEventListener('change', ()=>{
    timeout.value = timein.value;
  });
  timeout.addEventListener('change', ()=>{
    timein.value = timeout.value;
  });
};

const onSuccess = ()=>{
  document.querySelector('.map__filters').reset();
  form.reset();
  successMessage('Ваше объявление успешно размещено!');
};
const postData = ()=>{
  form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    const formData = new FormData(evt.target);
    request(onSuccess, failMessage('Не удалось отправить форму. Попробуйте ещё раз'), 'POST', formData);
  })
};

const loadAvatar = ()=>{
  avatarInput.addEventListener('change',()=>{
    avatarPreview.src = '';
    const file = avatarInput.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((type)=>{
      return fileName.endsWith(type);
    })
    if(matches){
      const reader = new FileReader();
      reader.addEventListener('load',()=>{
        avatarPreview.src = reader.result;

      });
      reader.readAsDataURL(file);
    }
  })
}

const loadPhoto = ()=>{
  photoInput.addEventListener('change',()=>{
    const file = photoInput.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((type)=>{
      return fileName.endsWith(type);
    })
    if(matches){
      const reader = new FileReader();
      reader.addEventListener('load',()=>{
        photoPreview.style.backgroundImage = `url(${reader.result})`;
        photoPreview.style.backgroundSize = 'contain';
        photoPreview.style.backgroundRepeat = 'no-repeat';
        photoPreview.style.backgroundPosition = 'center';
      })
      reader.readAsDataURL(file);
    }
  })
}

const fillForm = () => {
  changeType();
  changeTime();
  postData();
  loadAvatar();
  loadPhoto();
};


export { fillForm };
