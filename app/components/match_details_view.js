import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import MatchPlayerInfo from './match_player_info';
import { getMatch, getRanks } from '../reducers/index';

class MatchDetailsView extends Component {
  renderMatchDetails() {
    if (!this.props.match) return null;
    return (
      <ScrollView style={styles.summonerList}>
        {this.props.match.participants.map(participant =>
          <MatchPlayerInfo key={participant.summonerId} ranks={this.props.ranks} summoner={participant} />
        )}
      </ScrollView>
    );
  }

  render() {
    const title = this.props.match ? 'Match details' : 'No active match found';
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {title}
        </Text>
        {this.renderMatchDetails()}
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.props.onBackButtonPress}
            title={'Back'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  buttonContainer: {
    margin: 10
  },
  summonerList: {
    alignSelf: 'stretch',
    height: 500,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#dddddd'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

export default connect(state => ({
  match: getMatch(state),
  ranks: getRanks(state)
}))(MatchDetailsView);
