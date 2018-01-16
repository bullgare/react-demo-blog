import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import PostList from './components/post_list';
import PostCreate from './components/post_create';
import PostShow from './components/post_show';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter basename="/react-demo-blog">
      <Switch>
        <Route path="/create" component={PostCreate} />
        <Route path="/posts/:key" component={PostShow} />
        <Route path="/" component={PostList} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
