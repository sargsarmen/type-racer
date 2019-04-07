import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

import { logout } from "../../actions/account-actions";

export default inject("appStore")(
  observer(
    class Header extends React.Component {
      onLogout = e => {
        e.preventDefault();
        logout();
      };

      render() {
        const { userName } = this.props.appStore;
        return (
          <header>
            <div className="header-content cont-1120">
              <div className="head-left">
                <h1>TypeRacer</h1>
              </div>
              <div className="head-center">
                <Link className="link" to="/">
                  Game
                </Link>
                <Link className="link" to="/history">
                  History
                </Link>
              </div>
              <div className="head-right">
                <span className="marg-lr-20">{userName}</span>
                <button className="btn btn-green" onClick={this.onLogout}>
                  Logout
                </button>
              </div>
            </div>
          </header>
        );
      }
    }
  )
);
