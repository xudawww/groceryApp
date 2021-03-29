
import axios from 'axios';

export  const ChangeProductCategory= ( category) => {

  return (dispatch, getState)  => {
    dispatch( changeProductCategory(category))
  
}; }
const changeProductCategory = category=> ({
  type: "CHANGE_PRODUCT_CATEGORY",
  payload:category
  
});


