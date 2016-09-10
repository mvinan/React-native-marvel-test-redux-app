/* Keys */
import {apiKey, secretKey} from '../keys'
/* Modules Dependencies */
import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  TouchableHighlight,
  Image,
  ActivityIndicator
} from 'react-native';
import Crypto from 'crypto-js';
import autobind from 'autobind-decorator'

import NavigationBar from 'react-native-navbar'
/*Styles*/
import styles,{colors} from './styles'

class ListComicViews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
       })
    }
  }

  componentWillMount() {
    this.fetchData('http://gateway.marvel.com/v1/public/characters')
  }

  @autobind
  fetchData(url) {
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
  comicPressed(comic) {
    const {navigator, route} = this.props
    navigator.push({
      name: 'ComicDetailView',
      index: 2,
      title: comic.name,
      passProps: {comic}
    })
  }

  @autobind
  renderComics(comic){
    const onPressComic = () => this.comicPressed(comic)
    return (
      <TouchableHighlight
        onPress={onPressComic}>
        <Image
          style={styles.comicRow}
          source={{uri: `${comic.thumbnail.path}.${comic.thumbnail.extension}`}}
        >
          <View style={styles.rightContainer}>
            <Text style={styles.comicText}> {comic.name} </Text>
          </View>
        </Image>
      </TouchableHighlight>
    )
  }

  @autobind
  renderLoadingView() {
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

  render() {
    if(!this.state.loaded){
      return this.renderLoadingView()
    }
    return (
      <ListView
        style={{marginTop: 60}}
        dataSource={this.state.dataSource}
        renderRow={this.renderComics}
      />
    );
  }
}

export default ListComicViews
