
'use strict'

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';

import styles, {colors} from './styles'

class ComicDetailView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {comic} = this.props.route.passProps
    console.log(comic);

    let renderAllComics = comic.comics.items.map( (item, n) => {
        return (
          <View key={n} style={{
            padding:10,
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: colors.lightGrey,
          }}>
            <Text style={{color: colors.red}}>#{n+1} </Text><Text>{item.name}</Text>
          </View>
        )
      })

    return (
      <View style={{flex: 1}}>
        <Image
          source={{uri: `${comic.thumbnail.path}.${comic.thumbnail.extension}`}}
          style={styles.comicThumbnail}
        >
          {/* <Text style={styles.textButton}>{comic.name}</Text> */}
        </Image>

        <View style={{backgroundColor: '#242424', height: 24 }}>
          <Text style={[styles.comicHeading, {color: 'white'}]}>Comics Disponibles: {comic.comics.available}</Text>
        </View>

        <View style={{margin: 10}}>
          <Text>
            {comic.description}
          </Text>
        </View>

        <Text style={{
          color: colors.blue,
          textAlign: 'center',
          padding: 10,
          backgroundColor: colors.lightGrey
        }}>
          Comics List
        </Text>
        <ScrollView>
          {renderAllComics}
        </ScrollView>
      </View>
    );
  }
}

export default ComicDetailView
