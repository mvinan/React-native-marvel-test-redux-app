/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Crypto from 'crypto-js'
import { apiKey, secretKey } from './keys'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Image
} from 'react-native';

class List extends Component {
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

  componentWillMount(){
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
      <View>
        <Text>Cargando Comics ...</Text>
      </View>
    )
  }

  renderComic(comic) {
    return (
      <TouchableHighlight>
        <Image source={{uri: `${comic.thumbnail.path}.jpg`}}>
          <View>
            <Text>{comic.name}</Text>
            <Text>{comic.comics.available}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('List', () => List);
