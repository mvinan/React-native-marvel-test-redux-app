import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  Image
} from 'react-native';
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { fetchCharacters } from '../actions/comicsActions'

import {apiKey, secretKey, ts, hash} from '../../keys'
import styles, {colors} from '../styles'
import Crypto from 'crypto-js'

@connect( store => ({
  dataCharacters: store.fetchCharacters.data,
  dataFetched: store.fetchCharacters.dataFetched,
  dataSource: store.fetchCharacters.dataSource
}))
class ComicsView extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    let { dispatch, dataCharacters } = this.props
    let url = 'http://gateway.marvel.com/v1/public/characters'
    let urlBase = `${url}?ts=${ts}&apikey=${apiKey}&hash=${hash}`

    if(!dataCharacters.length){
      dispatch( fetchCharacters(urlBase) )
    }
  }

  @autobind
  onPressComic(comic){
    const {navigator, route} = this.props
    navigator.push({
      title: 'Detalle Caracter',
      index: comic.id,
      name: 'CharacterDetails',
      dataCharacters: comic
    })
  }

  @autobind
  renderComics(comic){
    let id = comic.id
    return (
      <TouchableHighlight
        onPress={() => this.onPressComic(comic)}>
        <Image
          source={{uri: `${comic.thumbnail.path}.${comic.thumbnail.extension}`}}
          style={styles.comicRow}
          resizeMode='cover'
        >
          <View style={styles.rightContainer}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              {comic.name}
            </Text>
          </View>
        </Image>
      </TouchableHighlight>
    )
  }

  render() {
    let { dataFetched, dataSource } = this.props
    if(!dataFetched){
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator
            animating={true}
            style={{
              alignItems: 'center',
              justifyContent: 'center'
            }}
            size={"small"}
            color={colors.red}
          />
        </View>
      )
    }
    return (
      <ListView
        style={{marginTop: 60}}
        dataSource={dataSource}
        renderRow={this.renderComics}
      />
    );
  }
}

export default ComicsView
