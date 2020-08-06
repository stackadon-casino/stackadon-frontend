import axios from 'axios'
const CURRENTUSER = 'CURRENTUSER'
const USERCHIPS = 'USERCHIPS'
const SIGNUP = 'SIGNUP'

const currentUser = userInfo => ({
  type: CURRENTUSER,
  userInfo
})

const userChips = chips => ({
  type: USERCHIPS,
  chips
})

const signUp = userInfo => ({
  type: SIGNUP,
  userInfo
})

export const signUpThunk = userInfo => {
  return async dispatch => {
    const { data } = await axios.post(
      'https://stackadon-backend.herokuapp.com/user/signup',
      // 'http://localhost:7070/user/signup',
      userInfo
    )
    dispatch(signUp(data))
  }
}

export const userChipsThunk = id => {
  return async dispatch => {
    const { data } = await axios.post(
      // 'http://localhost:7070/user/chips'
      'https://stackadon-backend.herokuapp.com/user/chips',
      {
        id
      }
    )
    dispatch(userChips(data))
  }
}

export const currentUserThunk = user => {
  return async dispatch => {
    const { data } = await axios.post(
      // 'http://localhost:7070/login'
      'https://stackadon-backend.herokuapp.com/login',
      user
    )
    if (data) {
      data[0].status = true
      dispatch(currentUser(data[0]))
    } else {
      dispatch(currentUser(data))
    }
  }
}

export default function user(curUser = {}, action) {
  switch (action.type) {
    case SIGNUP:
      return action.userInfo
    case USERCHIPS:
      return action.chips
    case CURRENTUSER:
      return action.userInfo
    default:
      return curUser
  }
}
