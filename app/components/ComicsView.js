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

import {apiKey, secretKey, ts, hash} from '../../keys'
import styles, {colors} from '../styles'
import Crypto from 'crypto-js'


@connect( store => {
  return {
    dataComics: store.fetchComics
  }
})
class ComicsView extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
       })
    }
  }

  componentDidMount(){
    let { dispatch, dataComics } = this.props
    let url = 'http://gateway.marvel.com/v1/public/comics'
    let urlBase = `${url}?ts=${ts}&apikey=${apiKey}&hash=${hash}`

    if(!dataComics.data.length > 0){
      dispatch( fetchComics(urlBase, this.state.dataSource))
    }
  }

  @autobind
  onPressComic(comic){
    let {navigator, route} = this.props
    navigator.push({
      title: 'Detalle del Comic',
      index: comic.id,
      name: 'ComicDetails',
      comicData: comic
    })
  }

  @autobind
  renderComics(comic){
    return (
      <TouchableHighlight
        onPress={()=>this.onPressComic(comic)}>
        <Image
          source={{uri: `${comic.thumbnail.path}.${comic.thumbnail.extension}`}}
          style={styles.comicRow}
          resizeMode='cover'
        >
          <View style={styles.rightContainer}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              {comic.title}
            </Text>
          </View>
        </Image>
      </TouchableHighlight>
    )
  }

  render() {
    let { dataComics } = this.props
    if(!dataComics.dataFetched){
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
        dataSource={dataComics.dataSource}
        renderRow={this.renderComics}
      />
    );
  }
}

export default ComicsView
