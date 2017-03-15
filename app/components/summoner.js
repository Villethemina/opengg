import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text
} from 'react-native';

export default class Summoner extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.summonerName}
        </Text>
        <Button
          onPress={() => this.props.onDelete(this.props.summonerId)}
          title={'Delete'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    padding: 10
  },
  text: {
    fontSize: 18
  }
});
