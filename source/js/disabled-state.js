const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const disableForm = ()=>{
  form.classList.add('ad-form--disabled');
  mapFilters.classList.add('ad-form--disabled');
  mapFilters.querySelectorAll('select,input').forEach((value)=>{
    value.disabled = true;
  });
  form.querySelectorAll('fieldset').forEach((value)=>{
    value.disabled = true;
  });
}
export {disableForm};
