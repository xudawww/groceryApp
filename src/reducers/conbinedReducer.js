import { combineReducers, createStore } from 'redux'
import todosReducer from './rootReducer'
export default function combinedRootReducer() {
    return combineReducers({
        todosReducer:todosReducer
        
  })
}