import React from "react";
import { inject, observer } from "mobx-react";

export default inject("appStore")(
  observer(
    class History extends React.Component {
      render() {
        const { history } = this.props.appStore.user;
        return (
          <div>
            <ul>
              <li>Date</li>
              <li>Accuracy</li>
              <li>Speed</li>
            </ul>
            {history.map(h => {
              return (
                <ul>
                  <li>{h.date}</li>
                  <li>{h.accuracy}</li>
                  <li>{h.wpm}</li>
                </ul>
              );
            })}
          </div>
        );
      }
    }
  )
);
