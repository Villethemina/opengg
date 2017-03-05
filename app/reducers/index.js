import { combineReducers } from 'redux';
import match, * as fromMatch from './match_reducer';
import app, * as fromApp from './app_reducer';

export default combineReducers({
  match,
  app
});

export function getMatch(state) {
  return fromMatch.getMatch(state.match);
}

export function getRanks(state) {
  return fromMatch.getRanks(state.match);
}

export function getSummoners(state) {
  return fromApp.getSummoners(state.app);
}

export function getView(state) {
  return fromApp.getView(state.app);
}
