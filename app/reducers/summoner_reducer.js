import {
  LOAD_SUMMONER_DATA,
  LOAD_MASTERY_DATA,
  LOAD_RUNE_DATA
} from '../constants/actions';

const initialState = {
  name: 'Annie Bot',
  summonerLevel: 3,
  runes: [],
  masteries: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SUMMONER_DATA:
      return { ...state, ...action.data };
    case LOAD_MASTERY_DATA:
      return {
        ...state,
        masteries: action.data.pages
      };
    case LOAD_RUNE_DATA:
      return {
        ...state,
        runes: action.data.pages
      };
    default:
      return state;
  }
};

export function getSummoner(state) {
  return state;
}

export default reducer;
