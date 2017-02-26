import {
  LOAD_SUMMONER_DATA,
  LOAD_MASTERY_DATA,
  LOAD_RUNE_DATA,
  CHANGE_VIEW
} from '../constants/actions';

export const loadSummonerData = data => ({
  type: LOAD_SUMMONER_DATA,
  data
});

export const loadMasteryData = data => ({
  type: LOAD_MASTERY_DATA,
  data
});

export const loadRuneData = data => ({
  type: LOAD_RUNE_DATA,
  data
});

export const changeView = view => ({
  type: CHANGE_VIEW,
  view
});
