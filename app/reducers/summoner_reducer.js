import { LOAD_SUMMONER_DATA } from '../constants/actions';

const initialState = {
  name: 'Annie Bot',
  level: 3
};

const summoner = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SUMMONER_DATA: {
      const { name, level } = action.data;
      return {
        name: name,
        level: level
      };
    }
    default:
      return state;
  }
};

export function getSummoner(state) {
  return state;
}

export default summoner;
