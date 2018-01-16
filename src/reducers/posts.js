import { ACTION_TYPE_FETCH } from '../actions';

export function postsReducer(state = [], action) {
  if (action.type === ACTION_TYPE_FETCH) {
    return action.payload;
  }

  return state;
}
