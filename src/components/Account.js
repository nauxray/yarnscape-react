import "./Account.css";

import dayjs from "dayjs";
import React from "react";

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //   navOpen: false,
    };

    this.user = this.props.user;
    this.joinedAt = dayjs(this.user?.created_at).format("D MMMM YYYY");
    this.userReviews = this.user?.reviews;

    // this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // console.log(this.user);
  }

  render() {
    return (
      <div className="account-container">
        {this.user ? (
          <>
            <p className="heading">Your Profile</p>
            <div className="account-profile">
              <div>Username: {this.user?.username}</div>
              <div>Password: {"*".repeat(8)}</div>
              <div>Joined: {this.joinedAt}</div>
            </div>
            <hr />
            <p className="heading">
              Your Past Reviews ({this.userReviews?.length})
            </p>
            <div className="account-reviews">
              {this.userReviews?.length > 0 ? (
                <div>test</div>
              ) : (
                <div>You haven't left any reviews!</div>
              )}
            </div>
          </>
        ) : (
          <div>You are not logged in :(</div>
        )}
      </div>
    );
  }
}
export default Account;
