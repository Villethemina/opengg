import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import AddSummonersView from './add_summoners_view';
import MatchDetailsView from './match_details_view';
import { changeView, loadMatchDataAndChangeView } from '../actions/index';
import { getView, getMatch, getRanks, getSummoners } from '../reducers/index';
import { ADD_SUMMONERS_VIEW, MATCH_DETAILS_VIEW, LOADING_VIEW } from '../constants/views';
import { API_ADDRESS, API_KEY, SERVER } from '../constants/riot_api';

class Root extends Component {
  searchForSummonerInMatch = summonerId => {
    console.log({ summonerId });
    return fetch(`${API_ADDRESS}/observer-mode/rest/consumer/getSpectatorGameInfo/${SERVER}/${summonerId}?api_key=${API_KEY}`)
      .then(response => {
        console.log('match response: ', summonerId, response);
        return Promise.resolve(
          /* eslint-disable */
          {"gameLength":751,"gameMode":"ARAM","mapId":12,"bannedChampions":[],"gameType":"MATCHED_GAME","gameId":3083602387,"observers":{"encryptionKey":"xtKoVfS/h/TMljqXIbYagt0J06y2hMR4"},"gameQueueConfigId":65,"gameStartTime":1488305215126,"participants":[{"masteries":[{"rank":5,"masteryId":6111},{"rank":1,"masteryId":6122},{"rank":5,"masteryId":6131},{"rank":1,"masteryId":6142},{"rank":5,"masteryId":6151},{"rank":1,"masteryId":6161},{"rank":5,"masteryId":6312},{"rank":1,"masteryId":6323},{"rank":5,"masteryId":6331},{"rank":1,"masteryId":6343}],"bot":false,"runes":[{"count":1,"runeId":5245},{"count":8,"runeId":5253},{"count":2,"runeId":5289},{"count":2,"runeId":5295},{"count":5,"runeId":5296},{"count":9,"runeId":5317},{"count":3,"runeId":5335}],"spell2Id":32,"profileIconId":578,"summonerName":"Zarevil","championId":114,"teamId":100,"summonerId":38579366,"spell1Id":4},{"masteries":[{"rank":5,"masteryId":6114},{"rank":1,"masteryId":6121},{"rank":5,"masteryId":6134},{"rank":1,"masteryId":6141},{"rank":5,"masteryId":6312},{"rank":1,"masteryId":6322},{"rank":5,"masteryId":6331},{"rank":1,"masteryId":6343},{"rank":5,"masteryId":6352},{"rank":1,"masteryId":6362}],"bot":false,"runes":[{"count":9,"runeId":5273},{"count":9,"runeId":5289},{"count":9,"runeId":5317},{"count":3,"runeId":5357}],"spell2Id":14,"profileIconId":1395,"summonerName":"GimmeSixZeroNine","championId":245,"teamId":100,"summonerId":61592622,"spell1Id":4},{"masteries":[{"rank":5,"masteryId":6111},{"rank":1,"masteryId":6121},{"rank":5,"masteryId":6131},{"rank":1,"masteryId":6143},{"rank":5,"masteryId":6312},{"rank":1,"masteryId":6323},{"rank":5,"masteryId":6332},{"rank":1,"masteryId":6343},{"rank":5,"masteryId":6351},{"rank":1,"masteryId":6362}],"bot":false,"runes":[{"count":9,"runeId":5253},{"count":3,"runeId":5289},{"count":6,"runeId":5295},{"count":9,"runeId":5317},{"count":2,"runeId":5343},{"count":1,"runeId":5355}],"spell2Id":7,"profileIconId":1439,"summonerName":"VolKiRaR","championId":420,"teamId":100,"summonerId":46147096,"spell1Id":4},{"masteries":[{"rank":5,"masteryId":6114},{"rank":1,"masteryId":6122},{"rank":5,"masteryId":6134},{"rank":1,"masteryId":6142},{"rank":5,"masteryId":6311},{"rank":1,"masteryId":6322},{"rank":5,"masteryId":6331},{"rank":1,"masteryId":6343},{"rank":5,"masteryId":6352},{"rank":1,"masteryId":6362}],"bot":false,"runes":[{"count":9,"runeId":5273},{"count":9,"runeId":5289},{"count":9,"runeId":5317},{"count":3,"runeId":5357}],"spell2Id":4,"profileIconId":983,"summonerName":"alexus4488","championId":105,"teamId":100,"summonerId":61882772,"spell1Id":32},{"masteries":[{"rank":5,"masteryId":6211},{"rank":1,"masteryId":6223},{"rank":5,"masteryId":6232},{"rank":1,"masteryId":6241},{"rank":5,"masteryId":6312},{"rank":1,"masteryId":6323},{"rank":5,"masteryId":6331},{"rank":1,"masteryId":6341},{"rank":5,"masteryId":6351},{"rank":1,"masteryId":6362}],"bot":false,"runes":[{"count":9,"runeId":5267},{"count":9,"runeId":5296},{"count":9,"runeId":5317},{"count":1,"runeId":5356},{"count":2,"runeId":5357}],"spell2Id":13,"profileIconId":782,"summonerName":"tanner912","championId":45,"teamId":100,"summonerId":38542105,"spell1Id":4},{"masteries":[{"rank":5,"masteryId":6111},{"rank":1,"masteryId":6122},{"rank":5,"masteryId":6131},{"rank":1,"masteryId":6141},{"rank":5,"masteryId":6311},{"rank":1,"masteryId":6322},{"rank":5,"masteryId":6331},{"rank":1,"masteryId":6342},{"rank":5,"masteryId":6351},{"rank":1,"masteryId":6362}],"bot":false,"runes":[{"count":9,"runeId":5245},{"count":9,"runeId":5289},{"count":9,"runeId":5317},{"count":3,"runeId":5335}],"spell2Id":32,"profileIconId":1590,"summonerName":"Queen Thresh","championId":238,"teamId":200,"summonerId":40105462,"spell1Id":4},{"masteries":[{"rank":5,"masteryId":6111},{"rank":1,"masteryId":6121},{"rank":5,"masteryId":6134},{"rank":1,"masteryId":6141},{"rank":5,"masteryId":6151},{"rank":1,"masteryId":6161},{"rank":5,"masteryId":6212},{"rank":1,"masteryId":6223},{"rank":5,"masteryId":6231},{"rank":1,"masteryId":6242}],"bot":false,"runes":[{"count":9,"runeId":5245},{"count":3,"runeId":5277},{"count":6,"runeId":5289},{"count":5,"runeId":5315},{"count":4,"runeId":5317},{"count":1,"runeId":5335},{"count":2,"runeId":5337}],"spell2Id":3,"profileIconId":785,"summonerName":"tribonaut","championId":91,"teamId":200,"summonerId":24637811,"spell1Id":4},{"masteries":[{"rank":5,"masteryId":6114},{"rank":1,"masteryId":6122},{"rank":5,"masteryId":6131},{"rank":1,"masteryId":6142},{"rank":5,"masteryId":6154},{"rank":1,"masteryId":6164},{"rank":5,"masteryId":6312},{"rank":1,"masteryId":6322},{"rank":5,"masteryId":6331},{"rank":1,"masteryId":6343}],"bot":false,"runes":[{"count":9,"runeId":5273},{"count":9,"runeId":5289},{"count":9,"runeId":5315},{"count":3,"runeId":5357}],"spell2Id":7,"profileIconId":1391,"summonerName":"FTS MadKillerZ","championId":38,"teamId":200,"summonerId":24300588,"spell1Id":4},{"masteries":[{"rank":5,"masteryId":6111},{"rank":1,"masteryId":6121},{"rank":5,"masteryId":6131},{"rank":1,"masteryId":6142},{"rank":5,"masteryId":6151},{"rank":1,"masteryId":6161},{"rank":5,"masteryId":6212},{"rank":1,"masteryId":6223},{"rank":5,"masteryId":6231},{"rank":1,"masteryId":6243}],"bot":false,"runes":[{"count":9,"runeId":5245},{"count":4,"runeId":5289},{"count":5,"runeId":5290},{"count":9,"runeId":5317},{"count":3,"runeId":5335}],"spell2Id":32,"profileIconId":912,"summonerName":"DerDjango","championId":21,"teamId":200,"summonerId":38958436,"spell1Id":4},{"masteries":[{"rank":5,"masteryId":6114},{"rank":1,"masteryId":6123},{"rank":5,"masteryId":6134},{"rank":1,"masteryId":6142},{"rank":5,"masteryId":6154},{"rank":1,"masteryId":6164},{"rank":5,"masteryId":6212},{"rank":1,"masteryId":6223},{"rank":5,"masteryId":6232},{"rank":1,"masteryId":6242}],"bot":false,"runes":[{"count":9,"runeId":5273},{"count":5,"runeId":5290},{"count":4,"runeId":5297},{"count":4,"runeId":5317},{"count":5,"runeId":5327},{"count":3,"runeId":5357}],"spell2Id":7,"profileIconId":608,"summonerName":"EPicKi113R","championId":25,"teamId":200,"summonerId":37561637,"spell1Id":4}],"platformId":"EUW1"}
          /* eslint-enable */
        );
        /*if (response.status !== 200) return Promise.reject('No match found for summoner: ' + summonerId);
        return response.json();*/
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
      })
      .catch(error => console.log(error));
  }

  handleSearchButtonPress = () => {
    this.props.dispatch(changeView(MATCH_DETAILS_VIEW));
    this.checkForOngoingGame(this.props.summoners);
  }

  handleBackButtonPress = () => {
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
      case ADD_SUMMONERS_VIEW: return (
        <AddSummonersView onSearchButtonPress={this.handleSearchButtonPress} />
      );
      case MATCH_DETAILS_VIEW: return (
        <MatchDetailsView onBackButtonPress={this.handleBackButtonPress} />
      );
      default: return null;
    }
  }

  renderAndroid() {
    return (
      <View style={styles.container}>
        {this.renderView()}
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
  ranks: getRanks(state),
  summoners: getSummoners(state)
}))(Root);
