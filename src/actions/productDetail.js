
import axios from 'axios';

export  const querySindleProduct= ( id) => {
  const url = require('../common/url').url
  return (dispatch, getState)  => {
    dispatch(getProductStarted());

    axios.post(url+'/querySingleProduct' ,id, { })
    .then(res => {
      console.log(res.data.msg)
      dispatch(getProductSuccess (res.data.msg));
    })
    .catch(err => {
      console.log(err )
      dispatch( getProductFailure(err ));
    });
  };
}; 
const getProductSuccess = products=> ({
  type: "GET_PRODUCT_SUCCESS",
  payload:products
  
});

const getProductStarted = () => ({
  type: "GET_PRODUCT_STARTED"
});

const getProductFailure = error => ({
  type: "GET_PRODUCT_FAILURE",
  payload: {
    error
  }
});