import {
  CALL_MODAL_STATUS, SET_CALL,
} from "../actions";

export const setModal = payload => {
  return (
    {
      type: CALL_MODAL_STATUS,
      payload
    }
  )
}

export const setCall = payload => {
  return (
    {
      type: SET_CALL,
      payload
    }
  )
}
