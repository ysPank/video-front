import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  UPDATE_ME,
  UPDATE_ME_SUCCESS,
  UPDATE_ME_ERROR,
} from "../actions";

export const getUsers = payload => {
  return (
    {
      type: GET_USERS,
      payload
    }
  )
}

export const getUsersSuccess = payload => {
  return (
    {
      type: GET_USERS_SUCCESS,
      payload,
    }
  )
}

export const getUsersError = () => {
  return (
    {
      type: GET_USERS_ERROR,
    }
  )
}

export const updateMe = payload => {
  return (
    {
      type: UPDATE_ME,
      payload
    }
  )
}

export const updateMeSuccess = payload => {
  return (
    {
      type: UPDATE_ME_SUCCESS,
      payload
    }
  )
}

export const updateMeUsersError = () => {
  return (
    {
      type: UPDATE_ME_ERROR,
    }
  )
}
