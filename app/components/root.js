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
import { loadSummoners, changeView, loadMatchData } from '../actions/index';
import { getView } from '../reducers/index';
import { ADD_SUMMONERS_VIEW, MATCH_DETAILS_VIEW } from '../constants/views';
import { API_ADDRESS, API_KEY, SERVER } from '../constants/riot_api';
import { ASYNC_STORAGE_KEY } from '../constants/app';

class Root extends Component {
  state = {
    searchFieldText: '',
    modalVisible: false,
    loading: false,
    modalText: ''
  }

  componentWillMount() {
    AsyncStorage.getItem(ASYNC_STORAGE_KEY).then(item => {
      if (item) {
        const summoners = JSON.parse(item);
        this.props.dispatch(loadSummoners(summoners));
        this.checkForOngoingGame(summoners);
      }
    }).done();
  }

  searchForSummonerInMatch = summonerId => {
    fetch(`${API_ADDRESS}/observer-mode/rest/consumer/getSpectatorGameInfo/${SERVER}/${summonerId}?api_key=${API_KEY}`)
    .then(response => {
      console.log('match response: ', summonerId, response);
      if (response.status !== 200) return Promise.reject('No match found for summoner: ' + summonerId);
      return response.json();
    })
    .then(match => {
      console.log(match);
      this.props.dispatch(loadMatchData(match));
      this.props.dispatch(changeView(MATCH_DETAILS_VIEW));
    })
    .catch(error => {
      console.log(error);
    });
  }

  checkForOngoingGame(summoners) {
    Object.keys(summoners).forEach(key => this.searchForSummonerInMatch(key));
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

  renderAndroid() {
    switch (this.props.view) {
      case ADD_SUMMONERS_VIEW: return <AddSummonersView />;
      case MATCH_DETAILS_VIEW: {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>
              Match details view placeholder
            </Text>
          </View>
        );
      }
      default: return null;
    }
  }

  render() {
    if (Platform.OS === 'ios') return this.renderIOS();
    else return this.renderAndroid();
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
  view: getView(state)
}))(Root);
