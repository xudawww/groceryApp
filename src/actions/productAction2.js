
import axios from 'axios';

  export  const queryProduct= ( category) => {
    const url = require('../common/url').url
    return (dispatch, getState)  => {
     
      console.log('here')
    

      console.log(category)
      dispatch(addProductStarted());
      axios
        .post(url+'/queryProduct' ,category, {
          
        })
        .then(res => {
          
          console.log(res.data.msg)

          dispatch(addProductSuccess(res.data.msg));
        })
        .catch(err => {
          console.log(err )
          dispatch( addProductFailure(err ));
        });
    };
  }; 
 const addProductSuccess = products=> ({
    type: "QUERY_PRODUCT_SUCCESS",
    payload:products
    
  });

  const addProductStarted = () => ({
    type: "QUERY_PRODUCT_STARTED"
  });
  
  const addProductFailure = error => ({
    type: "QUERY_PRODUCT_FAILURE",
    payload: {
      error
    }
  });