import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { fetchPosts } from '../actions';

class PostShow extends Component {
  constructor(props) {
    super(props);

    this.state = { post: null };
  }

  componentWillMount() {
    const post = this.filterPost();
    if (post) {
      this.setState({ post });
    } else {
      this.props.fetchPosts(() => {
        this.setState({ post: this.filterPost() });
      });
    }
  }

  getKey() {
    return this.props.match.params.key;
  }

  filterPost() {
    if (!this.props.posts) {
      return null;
    }
    if (! (this.getKey() in this.props.posts)) {
      return null;
    }
    return this.props.posts[this.getKey()];
  }

  renderContent() {
    const { post } = this.state;
    if (post) {
      return (
        <div>
          <h2>{post.title}</h2>
          <div>Categories: {post.categories}</div>
          <p>{post.content}</p>
        </div>
      );
    }

    return (
      <div>
        Post was not found
      </div>
    );
  }

  render() {
    return (
      <div>
        <Link to="/" className="btn btn-link">Back to list</Link>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({posts}) {
  return {posts};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostShow);
