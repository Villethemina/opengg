import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function MatchPlayerInfo({ ranks, summoner }) {
  let rankString;
  if (!ranks || !ranks[summoner.summonerId]) rankString = 'Unranked';
  else {
    const rankData = ranks[summoner.summonerId].find(league => league.queue === 'RANKED_SOLO_5x5');
    rankString = `${rankData.tier} ${rankData.entries[0].division} ${rankData.entries[0].leaguePoints} LP`;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {summoner.summonerName}
      </Text>
      <Text style={styles.text}>
        {'Rank: ' + rankString}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    padding: 10,
    height: 50
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333333'
  }
});
