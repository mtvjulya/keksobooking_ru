const URLs = {
  GET: 'https://23.javascript.pages.academy/keksobooking/data',
  POST: 'https://23.javascript.pages.academy/keksobooking',
}

const request = (onSuccess, onFail, method,body)=>{

  fetch(URLs[method],{
    method:method,
    body:body,
  })
    .then((response)=>response.json())
    .then((response) => {

      if (response.ok) {

        onSuccess(response);
      } else {
       onFail;
      }
    })
    .catch(() => {
      onFail;
    });
};

export {request};
