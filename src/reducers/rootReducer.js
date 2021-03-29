import ProductDetail from '../component/productDetail';
import {
    QUERY_PRODUCT_SUCCESS,
    QUERY_PRODUCT_FAILURE,
    QUERY_PRODUCT_STARTED,
    MORE_PRODUCT_SUCCESS,
    MORE_PRODUCT_STARTED,
    MORE_PRODUCT_FAILURE,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_STARTED,
    GET_PRODUCT_FAILURE,
    CHANGE_PRODUCT_CATEGORY,
 
   } from '../type/type'
    const initialState = {
        loading: false,
        products: {},
        error: null,
        todos:[],
        product:{},
        sellerProduct:{},
        category:'meat'
      };
      
      export default function todosReducer(state = initialState, action) {
        switch (action.type) {
          case CHANGE_PRODUCT_CATEGORY:
            return{
            ...state,
            category: action.payload

          }
          case QUERY_PRODUCT_STARTED:
            return {
              ...state,
              loading: true
            };   
          case QUERY_PRODUCT_SUCCESS:
            return {
              ...state,
              loading: false,
              error: null,
              products: action.payload
            };
          case QUERY_PRODUCT_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload.error
            };
          case GET_PRODUCT_STARTED:
              return {
                ...state,
                loading: true
              };   
            case GET_PRODUCT_SUCCESS:
              return {
                ...state,
                loading: false,
               
                product: action.payload
              };
            case GET_PRODUCT_FAILURE:
              return {
                ...state,
                loading: false,
                error: action.error
              };

          case MORE_PRODUCT_STARTED:
            return {
              ...state,
              loading: true
            };

          case MORE_PRODUCT_SUCCESS:
            return {
              ...state,
              loading: false,
              error: null,
              products: { 
                ...state.products,  
                //  [...state.products[action.category].list,...action.payload.list]
                [action.category]:{
                 ...[action.category],
                 list:[...state.products[action.category].list,...action.payload[action.category].list],
                 ifFinishLoad:action.payload[action.category].ifFinishLoad

                }
              }
            }; 
          case MORE_PRODUCT_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload.error
              };

          default:
            return state;
        }
      }