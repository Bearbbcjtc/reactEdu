import { createStore, combineReducers } from 'redux'
import {loginReducer, menuReducer} from './reducers/login'

const rootReducer = combineReducers({
    loginReducer,
    menuReducer
}); 
const store = createStore(rootReducer);
export default store;