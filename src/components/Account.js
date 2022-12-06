import "./Account.css";

import React from "react";
import { toast } from "react-toastify";

import AuthApi from "../utils/api/authApi";
import { withRouter } from "../utils/withRouter";
import Button from "./Button";
import Loader from "./Loader";
import { parseTime } from "../utils/parseRating";
import Edit from "./Icons/Edit";

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.user = this.props.user;
    this.joinedAt = parseTime(this.user?.created_at);
    this.userReviews = this.user?.reviews;

    this.state = {
      editProfile: false,
      newUsername: this.user?.username,
      newPassword: "",
      loading: false,
    };

    this.validate = this.validate.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  validate = () => {
    if (this.state.newUsername.length === 0) {
      toast.error("Username must not be empty!");
      return false;
    }
    const usernameRegex = new RegExp(/^[a-z0-9]+$/i);
    if (!usernameRegex.test(this.state.newUsername)) {
      toast.error("Username must be alphanumeric!");
      return false;
    }
    // if user did not change anything
    if (
      this.state.newUsername === this.user?.username &&
      this.state.newPassword.length === 0
    ) {
      this.setState({ editProfile: false });
      return false;
    }
    return true;
  };

  handleSave = async () => {
    if (!this.validate()) {
      return;
    }

    this.setState({ loading: true });
    const editedUsername = this.state.newUsername;
    const usernameUnchanged = editedUsername === this.user?.username;

    const res = await new AuthApi().editUser(
      this.user?._id,
      usernameUnchanged ? "" : editedUsername,
      this.state.newPassword
    );
    if (res.status === 204) {
      toast.success("Your changes have been saved!");
      this.props.logout();
      this.props.navigate("/login");
    } else if (res.status === 403) {
      toast.error("Please login again");
      this.props.logout();
      this.props.navigate("/login");
    } else {
      toast.error(res.data ?? "Something went wrong");
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <div className="account-container">
        {this.user ? (
          <>
            <div className="account-profile-header">
              <p className="heading">Your Profile</p>
              <button
                onClick={() => {
                  this.setState({ editProfile: !this.state.editProfile });
                }}
              >
                <Edit color={"var(--beige-yellow)"} />
              </button>
            </div>
            <div className="account-profile">
              <div>
                Username:{" "}
                {this.state.editProfile ? (
                  <input
                    value={this.state.newUsername}
                    onChange={(e) =>
                      this.setState({ newUsername: e.target.value })
                    }
                  />
                ) : (
                  this.user?.username
                )}
              </div>
              <div>
                Password:{" "}
                {this.state.editProfile ? (
                  <input
                    value={this.state.newPassword}
                    onChange={(e) =>
                      this.setState({ newPassword: e.target.value })
                    }
                    placeholder={"(unchanged)"}
                  />
                ) : (
                  "*".repeat(8)
                )}
              </div>
              <div>Joined: {this.joinedAt}</div>
            </div>
            {this.state.editProfile && (
              <div
                className="save-btn"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                {this.state.loading ? (
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      marginTop: "2rem",
                    }}
                  >
                    <Loader />
                  </div>
                ) : (
                  <Button
                    clickHandler={this.handleSave}
                    text={"Save"}
                    styles={{
                      padding: "0.2rem 2rem",
                      marginTop: "2rem",
                    }}
                  />
                )}
              </div>
            )}
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
          <div className="error">You are not logged in :(</div>
        )}
      </div>
    );
  }
}
export default withRouter(Account);
