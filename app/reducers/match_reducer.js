import {
  LOAD_MATCH_DATA_AND_CHANGE_VIEW,
  LOAD_MATCH_PLAYER_RANKS
} from '../constants/actions';

const initialState = {
  match: undefined,
  ranks: undefined
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MATCH_DATA_AND_CHANGE_VIEW:
      return {
        ...state,
        ranks: action.ranks,
        match: action.match
      };
    case LOAD_MATCH_PLAYER_RANKS:
      return {
        ...state,
        ranks: action.ranks
      };
    default:
      return state;
  }
};

export function getMatch(state) {
  return state.match;
}

export function getRanks(state) {
  return state.ranks;
}

export default reducer;
