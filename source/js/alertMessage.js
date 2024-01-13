const successMessage = (text)=>{

  const success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  const successText = success.querySelector('.success__message');
  successText.textContent = text;
  const closeMassage = ()=>{
    success.remove();
  };
  document.addEventListener('click',(evt)=>{
    //let e = document.querySelector('.success');
    if(!successText.contains(evt.target)){
      closeMassage();
    }
  });
  document.body.appendChild(success);
}

const failMessage = (text)=>{

  const fail = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  const failText = fail.querySelector('.error__message');
  failText.textContent = text;
  const closeMassage = ()=>{
    fail.remove();
  };
  document.addEventListener('click',(evt)=>{
    //let e = document.querySelector('.success');
    if(!failText.contains(evt.target)){
      closeMassage();
    }
  });
  document.body.appendChild(fail);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
}
export {successMessage, failMessage, showAlert};
