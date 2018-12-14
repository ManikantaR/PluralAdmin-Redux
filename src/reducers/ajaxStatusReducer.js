import * as types from "../actions/appConstants";
import initialState from "./initialState";

function actionTypeEndsWithSuccess(type) {
  return type.substring(type.length - 8) == "_SUCCESS";
}
export default function ajaxStatusReducer(  state = initialState.ajaxCallsInProgress,  action) {
    
 console.log (action.type);
  if (action.type == types.BEGGIN_AJAX_CALL) {
    return state + 1;
  } else if (action.type == types.AJAX_CALL_ERROR || actionTypeEndsWithSuccess(action.type)) {
    return state - 1;
  }
 
 
  return state;
}
