import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button
} from 'react-native';

import Modal from './modal';
import Summoner from './summoner';
import { addSummoner, deleteSummoner } from '../actions/index';
import { getSummoners } from '../reducers/index';
import { API_ADDRESS, API_KEY } from '../constants/riot_api';
import { MAX_SUMMONERS_ALLOWED } from '../constants/app';

class AddSummonersView extends Component {
  state = {
    searchFieldText: '',
    modalVisible: false,
    modalText: ''
  }

  handleSearchFieldTextChange = searchFieldText => this.setState({ searchFieldText });

  handleAddSummoner = () => {
    if (Object.keys(this.props.summoners).length >= MAX_SUMMONERS_ALLOWED) {
      return this.setState({
        modalText: 'Maximum allowed amount of summoners: ' + MAX_SUMMONERS_ALLOWED,
        modalVisible: true
      });
    }
    const summonerNames = Object.keys(this.props.summoners).map(
      summonerId => this.props.summoners[summonerId].name.toUpperCase()
    );
    console.log(summonerNames, this.state.searchFieldText.toUpperCase());
    if (summonerNames.includes(this.state.searchFieldText.toUpperCase())) {
      return this.setState({
        modalText: 'Summoner already added!',
        modalVisible: true
      });
    }
    fetch(`${API_ADDRESS}/api/lol/euw/v1.4/summoner/by-name/${this.state.searchFieldText}?api_key=${API_KEY}`)
      .then(response => {
        console.log('summoner name response: ', response);
        if (response.status !== 200) {
          this.setState({
            modalText: 'Summoner not found!',
            modalVisible: true
          });
          return Promise.reject('Summoner not found');
        }
        return response.json();
      })
      .then(summonerData => {
        const summoner = Object.values(summonerData)[0];
        console.log('addSummoner dispatched with', summoner);
        this.props.dispatch(addSummoner(summoner));
      })
      .catch(error => console.log(error));
  };

  handleDeleteSummoner = summonerId => {
    this.props.dispatch(deleteSummoner(summonerId));
  }

  handleModalClose = () => this.setState({ modalVisible: false });

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.modalVisible}
          handleClose={this.handleModalClose}
          buttonTitle={'Okay.'}
          text={this.state.modalText}
        />
        <View style={styles.searchArea}>
          <Text style={styles.title}>
            OpenGG
          </Text>
        </View>
        <Text style={styles.title}>
          Summoners:
        </Text>
        <View style={styles.summonerList}>
          {Object.keys(this.props.summoners).map(summonerId =>
            <Summoner
              key={summonerId}
              summonerId={summonerId}
              summonerName={this.props.summoners[summonerId].name}
              onDelete={this.handleDeleteSummoner}
            />
          )}
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            maxLength={16}
            style={styles.searchField}
            onChangeText={this.handleSearchFieldTextChange}
            placeholder={'Add a summoner'}
            onSubmitEditing={this.handleAddSummoner}
            value={this.state.searchFieldText}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.props.onSearchButtonPress}
            title={'Search'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  summonerList: {
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 300,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#dddddd'
  },
  searchArea: {
    marginTop: 20,
    marginBottom: 20
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
    borderWidth: 1,
    borderRadius: 4,
    margin: 5,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    margin: 10
  }
});

export default connect(state => ({
  summoners: getSummoners(state)
}))(AddSummonersView);
