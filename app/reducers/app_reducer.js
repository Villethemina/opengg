import { CHANGE_VIEW } from '../constants/actions';
import { MAIN_VIEW } from '../constants/views';

const initialState = {
  currentView: MAIN_VIEW
};

const summoner = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VIEW:
      return {
        currentView: action.view
      };
    default:
      return state;
  }
};

export default summoner;
