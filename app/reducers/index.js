import { combineReducers } from 'redux';
import summoner, * as fromSummoner from './summoner_reducer';
import app from './app_reducer';

export default combineReducers({
  summoner,
  app
});

export function getSummoner(state) {
  return fromSummoner.getSummoner(state.summoner);
}
