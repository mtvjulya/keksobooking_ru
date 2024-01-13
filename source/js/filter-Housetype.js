// import { loadMap } from "./map.js";
const filterForm = document.querySelector('.map__filters');
const houseTypeFilter = filterForm.querySelector('#housing-type');

const filter = (arr)=>{

  let newArr = arr;
  houseTypeFilter.addEventListener('change',()=>{
    const valueHouseFilter = houseTypeFilter.value;
    if (valueHouseFilter === 'any'){
      return newArr.slice().slice(0,10);
    }else{
      newArr.slice().filter((houseTypeArr)=> {
        return houseTypeArr.offer.type === valueHouseFilter;
      });
      return newArr.slice().slice(0,10);
    }
  });
};

export {filter};
