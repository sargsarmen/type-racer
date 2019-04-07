import React from "react";
import { inject, observer } from "mobx-react";
import { login } from "../../actions/account-actions";

export default inject("loginStore")(
  observer(
    class Login extends React.Component {
      componentDidMount() {
        const { init } = this.props.loginStore;
        init();
      }

      onUserNameChanged = e => {
        const { onUserNameChanged } = this.props.loginStore;
        onUserNameChanged(e.target.value);
      };

      onPasswordChanged = e => {
        const { onPasswordChanged } = this.props.loginStore;
        onPasswordChanged(e.target.value);
      };

      onLogin = () => {
        const { userName, password, addError } = this.props.loginStore;
        if (!userName) {
          addError("Fill UserName.");
        } else if (!password) {
          addError("Fill Password.");
        } else {
          login({ userName, password });
        }
      };

      render() {
        const { error, userName, password } = this.props.loginStore;

        return (
          <div className="login">
            <div>
              <h1 className="marg-b15">TypeRacer</h1>
              <div>
                {error && <span className="eror-text">{error}</span>}
                <div className="inp-block">
                  <input
                    type="text"
                    placeholder="UserName"
                    value={userName}
                    onChange={this.onUserNameChanged}
                  />
                </div>
                <div className="inp-block">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.onPasswordChanged}
                  />
                </div>
                <div>
                  <input
                    className="btn btn-green"
                    type="button"
                    value="Login"
                    disabled={error !== null}
                    onClick={this.onLogin}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  )
);
