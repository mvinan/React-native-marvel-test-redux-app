import NavigationBar from 'react-native-navbar'
import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  Text,
  Navigator,
  TouchableOpacity,
} from 'react-native';

import styles, {colors} from './components/styles'
import autobind from 'autobind-decorator'
/*Components*/
import ComicsView from './components/ComicsView'
import ListComicsView from './components/ListComicsView'
import ComicDetailView from './components/ComicDetailView'
import Icon from 'react-native-vector-icons/FontAwesome';

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
            routeMapper={routeMapperNavigationBar}
            style={styles.navigationBar}
          />
        }
      />
    );
  }
}

AppRegistry.registerComponent('List', () => App);
