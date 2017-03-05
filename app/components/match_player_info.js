import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function MatchPlayerInfo({ ranks, player }) {
  let rankString;
  if (!ranks || !ranks[player.summonerId]) rankString = 'Unranked';
  else {
    const rankData = ranks[player.summonerId].find(league => league.queue === 'RANKED_SOLO_5x5');
    rankString = `${rankData.tier} ${rankData.entries[0].division} ${rankData.entries[0].leaguePoints} LP`;
  }
  return (
    <View style={styles.container}>
      <Text key={player.summonerId} style={styles.text}>
        {player.summonerName + ' rank: ' + rankString}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
