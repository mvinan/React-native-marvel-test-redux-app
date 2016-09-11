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
  }

  @autobind
  configureSceneAnimation(route, routeStack){
    switch (route.name) {
      case 'HomeView':
        return Navigator.SceneConfigs.FloatFromBottom
      case 'ListComicsView':
        return Navigator.SceneConfigs.FloatFromBottom
      case 'ComicDetailView':
        return Navigator.SceneConfigs.HorizontalSwipeJump
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
      case 'ComicsView':
        return <ComicsView route={route} navigator={navigator} />
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
              style={styles.navigationBar}
            />
          }
        />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('List', () => App);
