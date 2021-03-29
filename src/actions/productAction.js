
import axios from 'axios';
export  const addProduct= ( product) => {
    const url = require('../common/url').url
    return (dispatch, getState)  => {
      dispatch(addProductStarted());
      console.log(product);

      axios
        .post(url+'/addProduct' ,product, {

        })
        .then(res => {
          dispatch(addProductSuccess(product));
        })
       
        .catch(err => {

        });
    };
  };

  const addProductSuccess = products=> ({
    type: "ADD_PRODUCT_SUCCESS",
    payload: {
      ...products
    }
  });

  const addProductStarted = () => ({
    type: "ADD_PRODUCT_STARTED"
  });

  const addProductFailure = error => ({
    type: "ADD_PRODUCT_FAILURE",
    payload: {
      error
    }
  });
