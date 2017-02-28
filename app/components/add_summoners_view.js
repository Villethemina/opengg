import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  AsyncStorage
} from 'react-native';

import Modal from './modal';
import { addSummoner, clearSummoners } from '../actions/index';
import { getSummoners } from '../reducers/index';
import { API_ADDRESS, API_KEY } from '../constants/riot_api';
import { ASYNC_STORAGE_KEY } from '../constants/app';

class AddSummonersView extends Component {
  state = {
    searchFieldText: '',
    modalVisible: false,
    modalText: ''
  }

  handleSearchFieldTextChange = searchFieldText => this.setState({ searchFieldText });

  handleAddSummoner = () => {
    fetch(`${API_ADDRESS}/api/lol/euw/v1.4/summoner/by-name/${this.state.searchFieldText}?api_key=${API_KEY}`)
    .then(response => {
      console.log('summoner name response: ', response);
      if (response.status !== 200) {
        this.setState({
          modalText: 'Summoner not found!',
          modalVisible: true
        });
        throw new Error('Summoner not found');
      }
      return response.json();
    })
    .then(summonerData => {
      const summoner = Object.values(summonerData)[0];
      this.props.dispatch(addSummoner(summoner));
      AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify({
        ...this.props.summoners,
        [summoner.id]: summoner
      }));
    })
    .catch(error => console.log('Data loading failed, reason: ' + error.message));
  };

  handleClearSummoners = () => {
    this.props.dispatch(clearSummoners());
    AsyncStorage.removeItem(ASYNC_STORAGE_KEY);
  }

  handleModalClose = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.modalVisible}
          handleClose={this.handleModalClose}
          title={'Okay.'}
          text={this.state.modalText}
        />
        <View style={styles.searchArea}>
          <Text style={styles.title}>
            Add a summoner:
          </Text>
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            maxLength={16}
            style={styles.searchField}
            onChangeText={this.handleSearchFieldTextChange}
            placeholder={'Summoner name'}
            onSubmitEditing={this.handleAddSummoner}
            value={this.state.searchFieldText}
          />
        </View>
        <Text style={styles.title}>
          Summoners:
        </Text>
        {Object.keys(this.props.summoners).map(summonerKey =>
          <Text key={summonerKey} style={styles.text}>
            {this.props.summoners[summonerKey].name}
          </Text>
        )}
        <Button
          onPress={this.handleClearSummoners}
          title={'Delete summoners'}
        />
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
  searchArea: {
    marginTop: 20,
    marginBottom: 20
  },
  infoArea: {
    justifyContent: 'flex-start'
  },
  split: {
    flex: 1,
    flexDirection: 'row'
  },
  half: {
    flex: 0.5
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  searchField: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default connect(state => ({
  summoners: getSummoners(state)
}))(AddSummonersView);
