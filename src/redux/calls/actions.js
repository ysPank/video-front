import {
  CALL_MODAL_STATUS, GET_TWILLIO_CONFIG, GET_TWILLIO_CONFIG_FAIL, GET_TWILLIO_CONFIG_SUCCESS, SET_CALL,
} from "../actions";

export const setModal = payload => ({
  type: CALL_MODAL_STATUS,
  payload
})

export const setCall = payload => ({
  type: SET_CALL,
  payload
})

export const getTwilioConfig = payload => ({
  type: GET_TWILLIO_CONFIG,
  payload
})

export const getTwilioConfigSuccess = payload => ({
  type: GET_TWILLIO_CONFIG_SUCCESS,
  payload
})

export const getTwilioConfigFail = payload => ({
  type: GET_TWILLIO_CONFIG_FAIL,
  payload
})
