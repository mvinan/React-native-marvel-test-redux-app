/*
 * Module Dependecies
 */
import Crypto from 'crypto-js'
import {apiKey, secretKey } from '../../keys.js'
import axios from 'axios'
import {ListView} from 'react-native'

export const fetchComics = (urlBase, listView) => {
  return function(dispatch) {
    let hash, ts, url
    ts = 1
    hash = Crypto.MD5(ts+secretKey+apiKey)

    url = `${urlBase}?ts=${ts}&apikey=${apiKey}&hash=${hash}`
    axios.get(url)
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
