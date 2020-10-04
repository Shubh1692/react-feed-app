import React, { Component } from "react";
import AddEditFeed from "./AddEditFeed";
import { connect } from "react-redux";
import { get } from "lodash";
import moment from "moment";
import { FeedTitle, FeedDetail,  ShowDate, FeedsList, EditBtn, FeedsListCard } from '../app-style';

class FeedList extends Component {
  constructor(props) {
    super(props);
    this.state = { id: "", openEdit: false, open: false };
  }

  render() {
    const { feeds } = this.props;
    const { openEdit, id, data } = this.state;
    return (
      <FeedsList >
        <FeedsListCard className="ui middle aligned divided list">
          {feeds.map((data, index) => (
            <div key={index} className="item">
              <div className="">
                <div className="left floated  content ">
                  <FeedTitle >{get(data, "title", "")}</FeedTitle>
                  <FeedDetail >{get(data, "description", "")}</FeedDetail>
                  <ShowDate>
                    {moment(get(data, "createdDate._seconds", "00-00-0000 00:00") * 1000).format(
                      "D MMM  YYYY, h:mm a"
                    )}
                  </ShowDate>
                </div>
                <div className="right floated  content ">
                  <EditBtn onClick={() => this.setState({ openEdit: true, id: data.id, data: data })}>
                    Edit
                  </EditBtn>
                </div>
              </div>
            </div>
          ))}

        </FeedsListCard>
        <AddEditFeed
          open={openEdit}
          handleClose={() => this.setState({ openEdit: false, id: "" })}
          id={id}
          data={data}
        />
      </FeedsList>
    );
  }
}
// get reducer state
const mapStateToProps = (state) => {
  return {
    feedList: state,
  };
};

export default connect(mapStateToProps)(FeedList);
