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
import {connect} from 'react-redux'
import {fetchComics} from '../actions/comicsActions'

import {apiKey, secretKey} from '../../keys'
import styles, {colors} from '../styles'
import Crypto from 'crypto-js'

class ComicsView extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
       })
    }
  }

  componentDidMount(){
    let url = 'http://gateway.marvel.com/v1/public/characters'
    this.fetchData(url)
  }

  @autobind
  fetchData(url){
    let ts, hash
    ts = 2
    hash = Crypto.MD5( ts + secretKey + apiKey )

    fetch(`${url}?ts=${ts}&apikey=${apiKey}&hash=${hash}`)
      .then( result => result.json() )
      .then( res => {
        let data = res.data.results
        this.setState({
          data,
          loaded: true,
          dataSource: this.state.dataSource.cloneWithRows(data)
        })
      })
  }

  @autobind
  renderComics(comic){
    let id = comic.id
    return (
      <TouchableHighlight
        onPress={this.onPressComic}>
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
    if(!this.state.loaded){
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
        style={{marginTop: 10}}
        dataSource={this.state.dataSource}
        renderRow={this.renderComics}
      />
    );
  }
}

export default ComicsView
