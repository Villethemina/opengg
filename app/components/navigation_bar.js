import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button
} from 'react-native';

export default class NavigationBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttona}>
          <Button
            onPress={this.props.handleSummonerButtonPress}
            title={'Add summoners'}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={this.props.handleMatchButtonPress}
            title={'Match'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'red',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  button: {
    borderRadius: 1,
    alignSelf: 'stretch',
    borderColor: 'black',
    backgroundColor: 'blue',
    flex: 0.5
  },
  buttona: {
    borderRadius: 1,
    alignSelf: 'stretch',
    borderColor: 'black',
    backgroundColor: 'green',
    flex: 0.5
  }
});
