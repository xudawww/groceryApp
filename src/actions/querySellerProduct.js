import axios from 'axios';
export  const SellerProduct= (uid) => {
  const url = require('../common/url').url
  return (dispatch, getState)  => {
    dispatch(SellerProductStarted ());
    axios.post(url+'/querySellerProduct' ,uid, { })
      .then(res => {
        console.log(res.data.msg)
        dispatch(SellerProductSuccess(res.data.msg));
      })
      .catch(err => {
        console.log(err )
        dispatch(SellerProductFailure(err ));
      });
  };
}; 
const SellerProductStarted = () => ({
    type: "SELLER_PRODUCT_STARTED"
  });
const SellerProductSuccess = ( products)=> ({
  type: "SELLER_PRODUCT_SUCCESS",
  payload:products,

  
});
const SellerProductFailure = error => ({
  type: "SELLER_PRODUCT_FAILURE",
  payload: {
    error
  }
});