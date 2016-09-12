import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import {colors} from '../styles'

class CharacterDetails extends Component {
  constructor(props){
    super(props)
    this.dataCharacters = this.props.route.dataCharacters
  }
  render() {
    let character, urlImage, descriptionChar
    character = this.dataCharacters
    urlImage = `${character.thumbnail.path}.${character.thumbnail.extension}`

    character.description ? {textAlign: 'center'} : false ;

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          {character.name}
        </Text>

        <Image
          style={styles.image}
          source={{uri: urlImage}}
          resizeMode="contain"
        />

        <View style={styles.containerDescription}>
          <Text style={[styles.description, !character.description ? {textAlign: 'center', fontSize: 20} : null ]}>
            {character.description || 'No existe descripción'}
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: 'white',
    marginHorizontal: 10
  },
  containerDescription: {
    padding: 10,
    backgroundColor: colors.lightGrey,
    borderRadius: 3
  },
  heading: {
    marginVertical: 20,
    color: colors.lightBlue,
    textAlign: 'center',
    fontSize: 20
  },
  image: {
    height: 300,
    marginVertical: 20
  }
})

export default CharacterDetails
