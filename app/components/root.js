import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button
} from 'react-native';
import { loadSummonerData, loadMasteryData, loadRuneData } from '../actions/index';
import { getSummoner } from '../reducers/index';

const API_KEY = '*****';

class Root extends Component {
  state = {
    searchFieldText: '',
    modalVisible: false,
    loading: false,
    modalText: ''
  }

  handleSearchFieldTextChange = searchFieldText => this.setState({ searchFieldText });

  handleSearch = () => {
    fetch(`https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/${this.state.searchFieldText}?api_key=${API_KEY}`)
    .then(response => {
      console.log('summoner name response: ', response);
      if (response.status !== 200) {
        this.setState({
          modalText: 'Summoner not found!',
          modalVisible: true
        });
        return;
      }
      response.json().then(summonerData => {
        const summoner = Object.values(summonerData)[0];
        this.props.dispatch(loadSummonerData(summoner));
        fetch(`https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/${summoner.id}/masteries?api_key=${API_KEY}`)
        .then(response => {
          response.json().then(masteryData => {
            const masteries = Object.values(masteryData)[0];
            this.props.dispatch(loadMasteryData(masteries));
            console.log('summoner masteries response: ', masteryData);
          });
        });
        fetch(`https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/${summoner.id}/runes?api_key=${API_KEY}`)
        .then(response => {
          response.json().then(runeData => {
            const runes = Object.values(runeData)[0];
            this.props.dispatch(loadRuneData(runes));
            console.log('summoner runes response: ', runeData);
          });
        });
      });
    });
  };

  handleModalClose = () => {
    this.setState({ modalVisible: false });
  };

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
    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.handleModalClose}
        >
          <View style={styles.spacer} />
          <View style={styles.modalContainer}>
            <View style={styles.modalSpacer} />
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                {this.state.modalText}
              </Text>
              <Button
                onPress={this.handleModalClose}
                title={'Okay.'}
              />
            </View>
            <View style={styles.modalSpacer} />
          </View>
          <View style={styles.spacer} />
        </Modal>
        <View style={styles.searchArea}>
          <Text style={styles.title}>
            Search:
          </Text>
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            maxLength={16}
            style={styles.searchField}
            onChangeText={this.handleSearchFieldTextChange}
            placeholder={'Summoner name'}
            onSubmitEditing={this.handleSearch}
            value={this.state.searchFieldText}
          />
        </View>
        <View style={styles.infoArea}>
          <Text style={styles.title}>
            Summoner information:
          </Text>
          <Text style={styles.text}>
            Name: {this.props.summoner.name}
          </Text>
          <Text style={styles.text}>
            Summoner Level: {this.props.summoner.summonerLevel}
          </Text>
          <View style={styles.split}>
            <View style={styles.half}>
              <Text style={styles.text}>
                Rune pages:
              </Text>
              {this.props.summoner.runes.map(page =>
                <Text style={styles.text}>
                  {page.name}
                </Text>
              )}
            </View>
            <View style={styles.half}>
              <Text style={styles.text}>
                Mastery pages:
              </Text>
              {this.props.summoner.masteries.map(page =>
                <Text style={styles.text}>
                  {page.name}
                </Text>
              )}
            </View>
          </View>
        </View>
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
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  spacer: {
    flex: 0.3
  },
  modalContainer: {
    flexDirection: 'row',
    flex: 0.4
  },
  modalContent: {
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.8,
    borderRadius: 10
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20
  },
  modalSpacer: {
    flex: 0.1
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
  summoner: getSummoner(state)
}))(Root);
