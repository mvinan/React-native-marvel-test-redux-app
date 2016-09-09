import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  Text,
  Navigator,
} from 'react-native';

import styles, {colors} from './components/styles'
/*Components*/
import ComicsView from './components/ComicsView'
import ListComicsView from './components/ListComicsView'
import ComicDetailView from './components/ComicDetailView'

const routeMapperNavigationBar = {
  LeftButton: (route, navigator, index, navState) => {
    if(route.index !== 0){
      return (
        <Text
          onPress={()=>{navigator.pop()}}
          style={{marginLeft: 10, paddingBottom: 10, paddingRight: 10, color: colors.blue}}>
          Atras
        </Text>
      )
    }
    return null
  },
  RightButton: (route, navigator, index, navState) => {
    return null
  },
  Title: (route, navigator, index, navState) => {
    if(route.index !== 0){
      return <Text>{route.title}</Text>
    }
    return null
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.renderScene = this.renderScene.bind(this)
    this.configureSceneAnimation = this.configureSceneAnimation.bind(this)
  }

  configureSceneAnimation(route, routeStack){
    switch (route.name) {
      case 'ComicsView':
        return Navigator.SceneConfigs.FloatFromBottom
      case 'ListComicsView':
        return Navigator.SceneConfigs.FloatFromBottom
      case 'ComicDetailView':
        return Navigator.SceneConfigs.HorizontalSwipeJump
      default:
        return Navigator.SceneConfigs.PushFromRight
    }
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'ComicsView':
        return <ComicsView route={route} navigator={navigator} />
      case 'ListComicsView':
        return <ListComicsView route={route} navigator={navigator} />
      case 'ComicDetailView':
        return <ComicDetailView route={route} navigator={navigator} />
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'ComicsView', title: 'Home', index: 0}}
        renderScene={this.renderScene}
        configureScene={this.configureSceneAnimation}
        navigationBar={
          <Navigator.NavigationBar
            style={{backgroundColor: colors.whiteTransparent, height: 50, paddingTop: 10}}
            routeMapper={routeMapperNavigationBar}
          />
        }
      />
    );
  }
}

AppRegistry.registerComponent('List', () => App);
