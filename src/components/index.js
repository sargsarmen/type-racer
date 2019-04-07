import React from "react";
import { inject, observer } from "mobx-react";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import WithHiderLayout from "./layouts/with-hider-layout";
import LoginLayout from "./layouts/login-layout";
import Game from "./game/";
import Login from "./login/";
import History from "./history/";
import { init } from "../actions/account-actions";
import history from "../utils/history";

const AppRoute = ({
  component: Component,
  layout: Layout,
  isPrivate,
  isAuthenticated,
  isLogin
}) => {
  return (
    <Route
      render={props => {
        if (isPrivate && !isAuthenticated) {
          return <Redirect to="/login" />;
        }
        if (isLogin && isAuthenticated) {
          return <Redirect to="/" />;
        }
        return (
          <React.Fragment>
            <Layout>
              <Component {...props} />
            </Layout>
          </React.Fragment>
        );
      }}
    />
  );
};

export default inject("appStore")(
  observer(
    class AppRouter extends React.Component {
      componentDidMount() {
        init();
      }

      render() {
        const { isAuthenticated } = this.props.appStore;
        return (
          <Router history={history}>
            <Switch>
              <AppRoute
                exact
                path="/"
                component={Game}
                layout={WithHiderLayout}
                isPrivate
                isAuthenticated={isAuthenticated}
              />
              <AppRoute
                exact
                path="/history"
                component={History}
                layout={WithHiderLayout}
                isPrivate
                isAuthenticated={isAuthenticated}
              />
              <AppRoute
                exact
                path="/login"
                component={Login}
                layout={LoginLayout}
                isLogin
                isAuthenticated={isAuthenticated}
              />
            </Switch>
          </Router>
        );
      }
    }
  )
);
