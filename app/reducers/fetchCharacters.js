import {ListView} from 'react-native'
let initialState = {
  dataFetched: false,
  data: [],
  dataSource: new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
  }),
  fetchCharacters: false
}

const fetchCharacters = (state=initialState, action) => {
  let newState
  switch (action.type) {
    case 'FETCH_CHARACTERS_FULFILLED':
      let data = action.payload.data.data.results
      newState = {
        ...state,
        data,
        dataSource: state.dataSource.cloneWithRows(data),
        dataFetched: true,
        fetchCharacters: true
      }
      return newState
    case 'FETCH_CHARACTERS_PENDING':
      newState = {...state, fetchCharacters: false }
      return newState
    case 'FETCH_CHARACTERS_REJECTED':
      return {...state, dataFetched: false, fetchCharacters: false, error: action.payload}
    default:
      return state
  }

}

export default fetchCharacters
