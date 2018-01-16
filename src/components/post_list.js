import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { fetchPosts, removePost } from '../actions';

class PostList extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    if (!this.props.posts) {
      return <div></div>;
    }

    return _.values(
        _.mapValues(this.props.posts, (post, key) => {
        return (
          <div key={key}>
            <h3>
              <Link to={`/posts/${key}`}>{post.title}</Link>
              <span className="btn-group">
                <button
                    className="btn btn-danger"
                    onClick={() => this.onRemoveClick(key, post)}
                    >x</button>
              </span>
            </h3>
            <div>Categories: {post.categories}</div>
            <p>{post.content}</p>
          </div>
        );
      })
    );
  }

  onRemoveClick(key, post) {
    this.props.removePost(key);
  }

  render() {
    return (
      <div>
        <Link className='btn btn-primary' to='/create'>Create new post</Link>
        {this.renderPosts()}
      </div>
    );
  }
}

function mapStateToProps({posts}) {
  return {posts};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts, removePost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
