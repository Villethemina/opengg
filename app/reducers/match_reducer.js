import {
  LOAD_MATCH_DATA
} from '../constants/actions';

const initialState = {
  gameLength: undefined,
  gameMode: undefined,
  mapId: undefined,
  bannedChampions: [],
  gameType: undefined,
  gameId: undefined,
  observers: {},
  gameStartTime: undefined,
  participants: [],
  platformId: undefined
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MATCH_DATA:
      return action.match;
    default:
      return state;
  }
};

export function getMatch(state) {
  return state;
}

export default reducer;
