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

import styles, {colors} from '../styles'

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

  componentWillMount(){
    let url = 'http://gateway.marvel.com/v1/public/comics'
    this.props.dispatch(fetchComics(url, this.state.dataSource))
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
              {comic.title}
            </Text>
          </View>
        </Image>
      </TouchableHighlight>
    )
  }

  render() {
    if(!this.props.dataComics.dataFetched){
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
        dataSource={this.props.dataComics.dataSource}
        renderRow={this.renderComics}
      />
    );
  }
}

export default ComicsView
