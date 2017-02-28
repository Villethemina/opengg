import {
  ADD_SUMMONER,
  CHANGE_VIEW,
  CLEAR_SUMMONERS,
  LOAD_MASTERY_DATA,
  LOAD_RUNE_DATA,
  LOAD_MATCH_DATA,
  LOAD_SUMMONERS
} from '../constants/actions';

export const loadSummoners = summoners => ({
  type: LOAD_SUMMONERS,
  summoners
});

export const clearSummoners = () => ({
  type: CLEAR_SUMMONERS
});

export const addSummoner = summoner => ({
  type: ADD_SUMMONER,
  summoner
});

export const loadMatchData = match => ({
  type: LOAD_MATCH_DATA,
  match
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
