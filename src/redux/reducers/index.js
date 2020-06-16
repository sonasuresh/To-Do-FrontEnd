import { combineReducers } from 'redux';
import NewToView from '../../views/NewToDoView'
import todoReducer from './todoReducer';

const rootReducer = combineReducers({
  form : todoReducer
});

export default rootReducer;