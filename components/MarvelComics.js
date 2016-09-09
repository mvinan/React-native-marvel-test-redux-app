import Crypto from 'crypto-js'
import { apiKey, secretKey } from '../keys'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Image
} from 'react-native';

class ComicsView extends Component {
  constructor(props){
    super(props)
    this.fetchData = this.fetchData.bind(this)
    this.renderLoadingView = this.renderLoadingView.bind(this)
    this.renderComic = this.renderComic.bind(this)
    this.state = {
      data: [],
      dataIsLoaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentDidMount(){
    this.fetchData('http://gateway.marvel.com/v1/public/characters')
  }

  fetchData(url){
    let hash, ts
    ts = 2
    hash = Crypto.MD5(ts + secretKey + apiKey)

    fetch(`${url}?ts=${ts}&apikey=${apiKey}&hash=${hash}`)
      .then( result => result.json() )
      .then( response => {
        this.setState({
          data: response.data.results,
          dataIsLoaded: true,
          dataSource: this.state.dataSource.cloneWithRows(response.data.results)
        })
        console.log(this.state)
      })
  }

  renderLoadingView() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando Comics ...</Text>
      </View>
    )
  }

  renderComic(comic) {
    return (
      <TouchableHighlight>
        <Image source={{uri: `${comic.thumbnail.path}.jpg`}}>
          <View style={{height: 120, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color: 'white', fontSize: 20}}>{comic.name}</Text>
            <Text style={{color: 'white'}}>{comic.comics.available}</Text>
          </View>
        </Image>
      </TouchableHighlight>
    )
  }

  render() {
    if(this.state.dataIsLoaded){
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderComic}
        />
      )
    }
    return this.renderLoadingView()
  }
}

export default ComicsView
