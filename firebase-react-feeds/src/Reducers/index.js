
import { constants } from '../Helper/Constant';

export function feedReducer(state = { feeds: [] }, action) {
  const { feeds } = state;
  switch (action.type) {
    case constants.ADD_NEW_FEED:
      return {
        ...state,
        feeds: [action.payload.feed, ...feeds],
        isLoading: false
      };
    case constants.LIST_FEED:
      return {
        ...state,
        feeds: [...action.payload.feeds],
        isLoading: false
      };
    case constants.UPDATE_FEED:
      const updatedIndex = feeds.findIndex(({ id }) => id === action.payload.id);
      feeds[updatedIndex] = action.payload.feed
      return {
        ...state,
        feeds: [...feeds],
        isLoading: false
      };
    case constants.IS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state
  }
}