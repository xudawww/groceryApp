import ProductDetail from '../component/productDetail';
import {

    SELLER_PRODUCT_SUCCESS,
    SELLER_PRODUCT_STARTED,
    SELLER_PRODUCT_FAILURE,
    MORE_SELLER_PRODUCT_SUCCESS,
    MORE_SELLER_PRODUCT_STARTED,
    MORE_SELLER_PRODUCT_FAILURE,
   } from '../type/type'
    const initialState = {
        products:{},
        userDetail:{},
        loading:false,
        error:null
      };
      
      export default function sellerReducer(state = initialState, action) {
        switch (action.type) {
          case SELLER_PRODUCT_STARTED:
            return{
            ...state,
            loading: true

          }
          case   SELLER_PRODUCT_SUCCESS:
            return{
            ...state,
            loading:false,
            products:action.payload
            

          }
          case SELLER_PRODUCT_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.error
                
    
              }
              case MORE_SELLER_PRODUCT_STARTED:
                return {
                  ...state,
                  loading: true
                };
    
              case MORE_SELLER_PRODUCT_SUCCESS: 
                return {
                  ...state,
                  loading: false,
                  error: null,
                  products: { 
                    ...state.products,  
                    [action.category]:{
                     ...[action.category],
                     list:[...state.products[action.category].list,...action.payload[action.category].list],
                     ifFinishLoad:action.payload[action.category].ifFinishLoad
    
                    }
                  }
                }; 
              case MORE_SELLER_PRODUCT_FAILURE:
                return {
                  ...state,
                  loading: false,
                  error: action.payload.error
                  };
         
          default:
            return state;
        }
      }