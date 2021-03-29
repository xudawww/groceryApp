import axios from 'axios';
export  const queryProductMore= ( category) => {
  const url = require('../common/url').url
  return (dispatch, getState)  => {
    dispatch(MoreProductStarted());
    console.log(category)
    axios.post(url+'/PageProduct' ,category, { })
      .then(res => {
        console.log(res.data.msg)
        dispatch(MoreProductSuccess(res.data.msg,category.get('category')));
      })
      .catch(err => {
        console.log(err )
        dispatch( MoreProductFailure(err ));
      });
  };
}; 
const MoreProductStarted = () => ({
    type: "MORE_PRODUCT_STARTED"
  });
const MoreProductSuccess = ( products,category)=> ({
  type: "MORE_PRODUCT_SUCCESS",
  payload:products,
  category:category
  
});
const MoreProductFailure = error => ({
  type: "MORE_PRODUCT_FAILURE",
  payload: {
    error
  }
});