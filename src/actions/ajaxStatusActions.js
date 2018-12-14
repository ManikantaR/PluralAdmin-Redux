import * as types from "./appConstants";

export function beginAjaxCall() {
  return { type: types.BEGGIN_AJAX_CALL };
}

export function ajaxCallError() {
  return { type: types.AJAX_CALL_ERROR };
}
