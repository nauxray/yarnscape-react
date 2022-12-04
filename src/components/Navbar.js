import "./Navbar.css";

import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

import Api from "../utils/api/api";
import Button from "./Button";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navOpen: false,
    };

    this.openSideNav = this.openSideNav.bind(this);
    this.closeSideNav = this.closeSideNav.bind(this);
    this.logout = this.logout.bind(this);
  }

  openSideNav = () => this.setState({ navOpen: true });
  closeSideNav = () => this.setState({ navOpen: false });

  fetchUser = async (token) => {
    const tokens = token.split(".");
    const userId = JSON.parse(atob(tokens[1])).userId;
    const user = await new Api()?.getUser(userId);
    this.props.setUser(user);
  };

  logout = () => {
    localStorage.removeItem("token");
    this.props.setUser(null);
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) this.fetchUser(token);
  }

  render() {
    return (
      <>
        <div className="mobile-menu">
          <FiMenu
            size={25}
            style={{ cursor: "pointer" }}
            onClick={this.openSideNav}
          />
          <Link to="/">
            <img src="/logos/logo1.svg" alt="logo" />
          </Link>
        </div>
        {/* mobile navbar */}
        <nav className={`mobile-sidenav${this.state.navOpen ? " open" : ""}`}>
          <div className="mobile-sidenav-logo">
            <Link to="/" onClick={this.closeSideNav}>
              <img src="/logos/logo2.svg" alt="logo" />
            </Link>
          </div>
          <AiOutlineClose
            className="close-btn"
            size={20}
            onClick={this.closeSideNav}
          />
          <div className="nav-links">
            {this.props.user ? (
              <div>
                Logged in as:
                <br />
                <span style={{ color: "var(--beige-yellow)" }}>
                  {this.props.user?.username}
                </span>
              </div>
            ) : (
              <Link
                to="/login"
                className="login-btn"
                onClick={this.closeSideNav}
              >
                <Button text={"Sign in"} styles={{ padding: "0.2rem 3rem" }} />
              </Link>
            )}
            <Link to="/" onClick={this.closeSideNav}>
              <div className="nav-link">
                <CiSearch /> Search
              </div>
            </Link>
            <Link to="/add-yarn" onClick={this.closeSideNav}>
              <div className="nav-link">
                <img src="/icons/yarn.svg" alt="yarn" /> Add Yarn
              </div>
            </Link>
            <Link to="/account" onClick={this.closeSideNav}>
              <div className="nav-link">
                <img src="/icons/account.svg" alt="account" /> Account
              </div>
            </Link>
          </div>
          {this.props.user && (
            <div className="mobile-logout-btn">
              <Button
                clickHandler={this.logout}
                text={"Log out"}
                styles={{
                  padding: "0.2rem 2.5rem",
                  transition: "all 0.3s ease",
                }}
              />
            </div>
          )}
        </nav>
        {/* desktop navbar */}
        <nav className="navbar">
          <Link to="/">
            <img src="/logos/logo1.svg" alt="logo" />
          </Link>
          <div className="nav-links">
            <Link to="/add-yarn">
              <div className="nav-link">
                <img src="/icons/yarn.svg" alt="yarn" /> Add Yarn
              </div>
            </Link>
            <Link to="/account">
              <div className="nav-link">
                <img src="/icons/account.svg" alt="account" />
                {this.props.user?.username ?? "Account"}
              </div>
            </Link>
            {this.props.user ? (
              <Button
                clickHandler={this.logout}
                text={"Log out"}
                styles={{
                  padding: "0.2rem 1.5rem",
                  transition: "all 0.3s ease",
                }}
              />
            ) : (
              <Link to="/login">
                <Button
                  text={"Sign in"}
                  styles={{ padding: "0.2rem 1.5rem" }}
                />
              </Link>
            )}
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
