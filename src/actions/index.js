import Firebase from 'firebase';

const Posts = new Firebase('https://react-demo-blog.firebaseio.com');

export const ACTION_TYPE_FETCH = 'fetch';
export const ACTION_TYPE_CREATE = 'create';

export function fetchPosts(cb) {
  return dispatch => {
    Posts.on('value', snapshot => {
      dispatch({
        type: ACTION_TYPE_FETCH,
        payload: snapshot.val()
      });

      if (cb) {
        cb();
      }
    });
  };
}

export function createPost(post, cb) {
  return dispatch => Posts.push(post, cb);
}

export function removePost(key) {
  return dispatch => Posts.child(key).remove();
}
