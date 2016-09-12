/*
 * Module Dependecies
 */
import Crypto from 'crypto-js'
import { apiKey, secretKey, hash, ts, url } from '../../keys.js'
import axios from 'axios'
import { ListView } from 'react-native'

export const fetchComics = (urlBase, listView) => {
  return function(dispatch) {
    axios.get(urlBase)
      .then( res => {
        let data = res.data.data.results
        dispatch({
          type: 'FETCH_COMICS',
          payload: data,
          dataSource: listView.cloneWithRows(data)
        })
      })
  }
}

export const fetchCharacters = (urlBase) => {
  return function(dispatch){
    dispatch({
      type: 'FETCH_CHARACTERS',
      payload: axios.get(urlBase)
    })
  }
}
