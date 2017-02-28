import {
  ADD_SUMMONER,
  CHANGE_VIEW,
  CLEAR_SUMMONERS,
  LOAD_SUMMONERS
} from '../constants/actions';
import { ADD_SUMMONERS_VIEW } from '../constants/views';

const initialState = {
  currentView: ADD_SUMMONERS_VIEW,
  savedSummoners: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VIEW:
      return {
        ...state,
        currentView: action.view
      };
    case LOAD_SUMMONERS:
      return {
        ...state,
        savedSummoners: action.summoners
      };
    case CLEAR_SUMMONERS:
      return {
        ...state,
        savedSummoners: {}
      };
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
