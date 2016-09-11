import {ListView} from 'react-native'
let initialState = {
  dataFetched: false,
  data: [],
  dataSource: new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
   })
}

const fetchComics = (state=initialState, action) => {

  switch (action.type) {
    case 'FETCH_COMICS':
      let newState = Object.assign({},state, {
        dataFetched: true,
        data: action.payload,
        dataSource: action.dataSource
      })
      return newState
    default:
      return state
  }

}

export default fetchComics
