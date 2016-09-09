import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

/*Styles*/
import styles from './styles'

class ComicsView extends Component {
  constructor(props) {
    super(props)
    this.renderComicsView = this.renderComicsView.bind(this)
  }

  renderComicsView(){
    const { navigator, route } = this.props
    navigator.push({
      name: 'ListComicsView',
      index: 1,
      title: 'Lista de Comics'
    })
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableHighlight
          onPress={this.renderComicsView}
          style={styles.primaryButton}>
          <Text style={styles.textButton}>Mostrarme Comics</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default ComicsView
