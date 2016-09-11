const goToView = (state={}, action)=>{
  switch (action.type) {
    case 'GO_TO_VIEW':
    let newState
      action.payload.navigator.push({
        title: action.payload.title,
        index: action.payload.index,
        name: action.payload.name
      })

      newState = Object.assign({}, state, {dataView: action.payload})
      return newState
    default:
      return state
  }
}

export default goToView
