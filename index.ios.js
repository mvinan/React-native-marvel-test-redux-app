import NavigationBar from 'react-native-navbar'
import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  Text,
  Navigator,
  TouchableOpacity,
} from 'react-native';
import { Provider } from 'react-redux'
import store from './app/store'

import autobind from 'autobind-decorator'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles, {colors} from './app/styles'

import HomeView from './app/components/HomeView'
import CharactersView from './app/components/CharactersView'
import ComicsView from './app/components/ComicsView'
import ComicDetails from './app/components/ComicDetails'
import CharacterDetails from './app/components/CharacterDetails'

const routeMapperNavigationBar = {
  LeftButton: (route, navigator, index, navState) => {
    if(route.index !== 0){
      return (
        <TouchableOpacity
          onPress={()=>{navigator.pop()}}
          style={styles.navigationBack}>
          <Icon
            name={'chevron-left'}
            size={17}
            color={colors.blue}
          />
          <Text style={styles.navigationBackText}>Atras</Text>

        </TouchableOpacity>
      )
    }
    return null
  },
  RightButton: (route, navigator, index, navState) => {
    return null
  },
  Title: (route, navigator, index, navState) => {
    if(route.index !== 0){
      return <Text style={styles.navigationTitle}>{route.title}</Text>
    }
    return null
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      route: null
    }
  }

  @autobind
  configureSceneAnimation(route, routeStack){
    switch (route.name) {
      case 'CharactersView':
        return Navigator.SceneConfigs.FloatFromBottom
      case 'ComicsView':
        return Navigator.SceneConfigs.FloatFromBottom
      default:
        return Navigator.SceneConfigs.PushFromRight
    }
  }

  @autobind
  renderScene(route, navigator) {
    switch (route.name) {
      case 'HomeView':
        return <HomeView route={route} navigator={navigator} />
      case 'CharactersView':
        return <CharactersView route={route} navigator={navigator} />
      case 'CharactersDetails':
        return <CharactersDetails route={route} navigator={navigator} />
      case 'ComicsView':
        return <ComicsView route={route} navigator={navigator} />
      case 'ComicDetails':
        return <ComicDetails route={route} navigator={navigator} />
      case 'CharacterDetails':
        return <CharacterDetails route={route} navigator={navigator} />
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{name: 'HomeView', title: 'Home', index: 0}}
          renderScene={this.renderScene}
          configureScene={this.configureSceneAnimation}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={routeMapperNavigationBar}
            />
          }
        />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('List', () => App);
