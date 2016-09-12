import {combineReducers} from 'redux'
import fetchComics from './fetchComics'
import fetchCharacters from './fetchCharacters'
import goToView from './goToViews'

const allReducers = combineReducers({
  fetchComics,
  fetchCharacters,
  goToView
})

export default allReducers
