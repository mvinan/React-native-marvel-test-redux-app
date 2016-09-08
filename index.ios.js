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
  View
} from 'react-native';

class List extends Component {
  constructor(props){
    super(props)
    this.fetchData = this.fetchData.bind(this)
    this.state = {
      data: [],
      dataIsLoaded: false
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
          dataIsLoaded: true
        })
        console.log(this.state)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
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
