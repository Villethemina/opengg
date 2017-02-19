import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';

import { getSummoner } from '../reducers/index';

class Root extends Component {
  renderIOS() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          IOS not supported :(
        </Text>
      </View>
    );
  }

  renderAndroid() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Summoner information:
        </Text>
        <Text style={styles.instructions}>
          Name: {this.props.summoner.name}
        </Text>
        <Text style={styles.instructions}>
          Level: {this.props.summoner.level}
        </Text>
      </View>
    );
  }

  render() {
    if (Platform.OS === 'ios') return this.renderIOS();
    else return this.renderAndroid();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

export default connect(state => ({
  summoner: getSummoner(state)
}))(Root);
