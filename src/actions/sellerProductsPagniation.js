import axios from 'axios';
export  const sellerProductMore= ( category) => {
  const url = require('../common/url').url
  return (dispatch, getState)  => {
    dispatch(MoreSellerProductStarted());
    console.log(category)
    axios.post(url+'/PageSellerProduct' ,category, { })
      .then(res => {
        console.log(res)
        dispatch(MoreSellerProductSuccess(res.data.msg,category.get('category')));
      })
      .catch(err => {
        console.log(err )
        dispatch( MoreSellerProductFailure(err ));
      });
  };
}; 
const MoreSellerProductStarted = () => ({
    type: "MORE_SELLER_PRODUCT_STARTED"
  });
const MoreSellerProductSuccess = ( products,category)=> ({
  type: "MORE_SELLER_PRODUCT_SUCCESS",
  payload:products,
  category:category
  
});
const MoreSellerProductFailure = error => ({
  type: "MORE_PRODUCT_FAILURE",
  payload: {
    error
  }
});