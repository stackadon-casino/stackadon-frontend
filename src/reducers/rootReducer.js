import table, {indexReducer} from './table'
import decks from './deck'
import dealer from './dealer'
import deal from './deal'
import user from './user'
import { combineReducers } from 'redux'

export default combineReducers({
  table,
  decks,
  dealer,
  trigger: deal,
  user,
  indexReducer
})
