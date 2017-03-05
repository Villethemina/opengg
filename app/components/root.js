import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import AddSummonersView from './add_summoners_view';
import MatchDetailsView from './match_details_view';
import NavigationBar from './navigation_bar';
import { loadSummoners, changeView, loadMatchDataAndChangeView } from '../actions/index';
import { getView, getMatch, getRanks } from '../reducers/index';
import { ADD_SUMMONERS_VIEW, MATCH_DETAILS_VIEW, LOADING_VIEW } from '../constants/views';
import { API_ADDRESS, API_KEY, SERVER } from '../constants/riot_api';
import { ASYNC_STORAGE_KEY_SUMMONERIDS, ASYNC_STORAGE_KEY_MATCH, MATCH_MAX_CACHE_AGE } from '../constants/app';

class Root extends Component {
  componentWillMount() {
    this.checkForExistingMatchData();
  }

  checkForExistingMatchData() {
    AsyncStorage.getItem(ASYNC_STORAGE_KEY_MATCH).then(item => {
      if (item) {
        const matchObject = JSON.parse(item);
        const date = new Date();
        if (matchObject.time + MATCH_MAX_CACHE_AGE > date.getTime()) {
          this.props.dispatch(loadMatchDataAndChangeView(matchObject.match, matchObject.ranks));
        } else {
          AsyncStorage.removeItem(ASYNC_STORAGE_KEY_MATCH);
          this.checkForPlayersInGame();
        }
      } else {
        this.checkForPlayersInGame();
      }
    }).done();
  }

  checkForPlayersInGame() {
    AsyncStorage.getItem(ASYNC_STORAGE_KEY_SUMMONERIDS).then(item => {
      if (item) {
        const summoners = JSON.parse(item);
        this.props.dispatch(loadSummoners(summoners));
        this.checkForOngoingGame(summoners);
      } else {
        this.props.dispatch(changeView(ADD_SUMMONERS_VIEW));
      }
    }).done();
  }

  searchForSummonerInMatch = summonerId => {
    console.log({ summonerId });
    return fetch(`${API_ADDRESS}/observer-mode/rest/consumer/getSpectatorGameInfo/${SERVER}/${summonerId}?api_key=${API_KEY}`)
      .then(response => {
        console.log('match response: ', summonerId, response);
        if (response.status !== 200) return Promise.reject('No match found for summoner: ' + summonerId);
        return response.json();
      });
  }

  returnFirstResolvedPromise = promises => {
    console.log({ promises });
    if (promises.length === 0) return Promise.reject('No summoners left to check');
    const promisesWithIndices = promises.map((promise, index) => promise.catch(() => { throw index; }));
    return Promise.race(promisesWithIndices).catch(index => {
      const rejectedPromise = promises.splice(index, 1)[0];
      rejectedPromise.catch(error => console.log(error));
      return this.returnFirstResolvedPromise(promises);
    });
  };

  checkForOngoingGame(summoners) {
    console.log({ summoners });
    this.returnFirstResolvedPromise(
      Object.keys(summoners).map(summonerId => this.searchForSummonerInMatch(summonerId))
    )
      .then(match => {
        console.log(match);
        this.fetchRankDataForMatch(match);
      })
      .catch(error => {
        this.props.dispatch(changeView(MATCH_DETAILS_VIEW));
        console.log(error);
      });
  }

  fetchRankDataForMatch(match) {
    const summonerIds = match.participants.map(participant => participant.summonerId);
    if (summonerIds.length === 0) return;
    const summonerIdStrings =summonerIds.join();
    fetch(`${API_ADDRESS}/api/lol/euw/v2.5/league/by-summoner/${summonerIdStrings}/entry?api_key=${API_KEY}`)
      .then(response => {
        console.log('rankdata response: ', response);
        if (response.status !== 200) return Promise.reject('Couldn\'t fetch rank data');
        return response.json();
      })
      .then(ranks => {
        console.log({ ranks });
        this.props.dispatch(loadMatchDataAndChangeView(match, ranks));
        this.storeMatchToDevice(match, ranks);
      })
      .catch(error => console.log(error));
  }

  storeMatchToDevice(match, ranks) {
    const date = new Date();
    const time = date.getTime();
    AsyncStorage.setItem(ASYNC_STORAGE_KEY_MATCH, JSON.stringify({ match, ranks, time }));
  }

  handleMatchButtonPress = () => {
    this.props.dispatch(changeView(MATCH_DETAILS_VIEW));
    this.checkForExistingMatchData();
  }

  handleSummonerButtonPress = () => {
    this.props.dispatch(changeView(ADD_SUMMONERS_VIEW));
  }

  renderIOS() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          IOS not supported :(
        </Text>
      </View>
    );
  }

  renderView() {
    switch (this.props.view) {
      case LOADING_VIEW: return (
        <View style={styles.container}>
          <Text style={styles.title}>
            LOADING
          </Text>
        </View>
      );
      case ADD_SUMMONERS_VIEW: return <AddSummonersView />;
      case MATCH_DETAILS_VIEW: return <MatchDetailsView />;
      default: return null;
    }
  }

  renderAndroid() {
    return (
      <View style={styles.container}>
        {this.renderView()}
        <NavigationBar
          handleMatchButtonPress={this.handleMatchButtonPress}
          handleSummonerButtonPress={this.handleSummonerButtonPress}
        />
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
    flex: 1
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

export default connect(state => ({
  view: getView(state),
  match: getMatch(state),
  ranks: getRanks(state)
}))(Root);
