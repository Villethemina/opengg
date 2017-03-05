import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import MatchPlayerInfo from './match_player_info';
import { getMatch, getRanks } from '../reducers/index';

class MatchDetailsView extends Component {
  renderNoMatchFound() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          No active match found
        </Text>
      </View>
    );
  }
  render() {
    if (!this.props.match) return this.renderNoMatchFound();
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Match details
        </Text>
        {this.props.match.participants.map(participant =>
          <MatchPlayerInfo key={participant.summonerId} ranks={this.props.ranks} player={participant} />
        )}
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
