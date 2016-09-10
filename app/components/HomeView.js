import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from '../styles'

class HomeView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the HomeView component</Text>
      </View>
    );
  }
}

export default HomeView
