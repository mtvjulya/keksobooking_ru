const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const activateForm = ()=>{
  form.classList.remove('ad-form--disabled');
  form.querySelectorAll('fieldset').forEach((value)=>{
    value.disabled = false;
  });
}

const activateFilters = ()=>{

  mapFilters.classList.remove('ad-form--disabled');
  mapFilters.querySelectorAll('select,input').forEach((value)=>{
    value.disabled = false;
  });

}
export {activateForm, activateFilters};
