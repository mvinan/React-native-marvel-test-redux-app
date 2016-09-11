import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Button from '../commonComponents/Buttons'

import styles from '../styles'
import {connect} from 'react-redux'
import autobind from 'autobind-decorator'

import goToView from '../actions/routeActions'

@connect( store => {
  return store
})
class HomeView extends Component {
  constructor(props){
    super(props)
  }

  @autobind
  comicsRender(){
    this.props.dispatch(goToView({
      navigator: this.props.navigator,
      title: 'Lista de Comics',
      index: 1,
      name: 'ComicsView'
    }))
  }

  @autobind
  charactersRender(){
    this.props.dispatch(goToView({
      navigator: this.props.navigator,
      title: 'Personajes',
      index: 2,
      name: 'CharactersView'
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          text={'Comics'}
          buttonType={'primary'}
          onPress={this.comicsRender}
        />

        <Button
          text={'Characters'}
          buttonType={'secondary'}
          onPress={this.charactersRender}
        />
      </View>
    );
  }
}

export default HomeView
