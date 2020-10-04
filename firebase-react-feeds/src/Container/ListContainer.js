import React, { Component } from 'react';
import NoFeedAdded from '../Components/NoFeedAdded';
import Feeds from '../Components/Feeds';
import { connect } from 'react-redux';
import { get } from 'lodash';
import * as firebase from 'firebase';
import { CardList } from '../app-style';
import { fetchFeeds } from '../Actions/feeds';


class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: []
    }
  }

  async componentDidMount() {
    const { fetchFeeds } = this.props;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        fetchFeeds(user.uid);
      }
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (get(props.feedList, 'feeds', []) !== state.feeds) {
      return {
        feeds: get(props.feedList, 'feeds', []),
      };
    }
    return null;
  }
  render() {
    const { feeds } = this.state;
    return (
      <CardList >
        {feeds.length === 0 ? <NoFeedAdded /> : <Feeds feeds={feeds} />}
      </CardList>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    feedList: state
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFeeds: (userId) => fetchFeeds(dispatch, userId),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);