import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';

import {connect} from 'react-redux';
import {colors} from '../styles'

class ComicDetails extends Component {
  constructor(props){
    super(props)
    this.comicData = this.props.route.comicData
  }
  render() {
    let comicData = this.comicData
    let urlImage = `${comicData.thumbnail.path}.${comicData.thumbnail.extension}`
    return (
      <View style={styles.container}>

        <View style={styles.heading}>
          <Text style={[styles.textBold, styles.titleHeading]}>
            {comicData.title}
          </Text>

          <Text style={styles.row}>
            <Text style={styles.textBold}>Costo: </Text>
            <Text>{comicData.prices[0].price}</Text>
          </Text>
        </View>

        <ScrollView>
          <Image
            resizeMode="contain"
            style={styles.thumbnail}
            source={{uri: urlImage}}
          ></Image>
          <Text style={styles.description}>{comicData.description}</Text>
          <Text>{comicData.description}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginVertical: 15
  },
  description: {
    marginBottom: 20
  },
  titleHeading:{
    color: colors.orange
  },
  row: {
    flexDirection: 'row'
  },
  textBold: {
    color: '#242424',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    marginTop: 60,
    marginHorizontal: 15
  },
  thumbnail: {
    height: 400,
    marginBottom: 20
  }
})

export default ComicDetails
