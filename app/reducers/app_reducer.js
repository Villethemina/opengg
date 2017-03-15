import {
  ADD_SUMMONER,
  CHANGE_VIEW,
  DELETE_SUMMONER,
  LOAD_SUMMONERS,
  LOAD_MATCH_DATA_AND_CHANGE_VIEW
} from '../constants/actions';
import { ADD_SUMMONERS_VIEW, MATCH_DETAILS_VIEW } from '../constants/views';

const initialState = {
  currentView: ADD_SUMMONERS_VIEW,
  savedSummoners: {}
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case CHANGE_VIEW:
      return {
        ...state,
        currentView: action.view
      };
    case LOAD_MATCH_DATA_AND_CHANGE_VIEW:
      return {
        ...state,
        currentView: MATCH_DETAILS_VIEW
      };
    case LOAD_SUMMONERS:
      return {
        ...state,
        savedSummoners: action.summoners
      };
    case DELETE_SUMMONER: {
      const newSavedSummoners = Object.keys(state.savedSummoners).reduce((savedSummoners, summonerId) => {
        if (summonerId === action.summonerId) return savedSummoners;
        else return { ...savedSummoners, [summonerId]: state.savedSummoners[summonerId] };
      }, {});
      return {
        ...state,
        savedSummoners: newSavedSummoners
      };
    }
    case ADD_SUMMONER:
      return {
        ...state,
        savedSummoners: {
          ...state.savedSummoners,
          [action.summoner.id]: action.summoner
        }
      };
    default:
      return state;
  }
};

export function getSummoners(state) {
  return state.savedSummoners;
}

export function getView(state) {
  return state.currentView;
}

export default reducer;
