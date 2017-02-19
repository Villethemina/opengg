import { LOAD_SUMMONER_DATA, CHANGE_VIEW } from '../constants/actions';

export const loadSummonerData = data => ({
  type: LOAD_SUMMONER_DATA,
  data
});

export const changeView = view => ({
  type: CHANGE_VIEW,
  view
});
