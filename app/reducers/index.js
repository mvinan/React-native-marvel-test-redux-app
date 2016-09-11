import {combineReducers} from 'redux'
import fetchComics from './fetchComics'
import goToView from './goToViews'

const allReducers = combineReducers({
  fetchComics,
  goToView
})

export default allReducers
