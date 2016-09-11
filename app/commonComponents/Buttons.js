import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import styles from '../styles'

class Button extends Component {
  constructor(props){
    super(props)
  }

  render() {
    let buttonStyles

    switch (this.props.buttonType) {
      case 'primary':
        buttonStyles = styles.primaryButton
        break;
      case 'secondary':
        buttonStyles = styles.secondaryButton
        break;
      default:
        buttonStyles = styles.primaryButton
        return null
    }

    return (
      <TouchableHighlight
        style={[
          buttonStyles,
          {
            marginTop: 10,
            marginBottom: 10,
            width: 200
          }
        ]}
        {...this.props}
      >
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    );
  }
}

export default Button
