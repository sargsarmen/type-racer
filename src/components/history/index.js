import React from "react";
import { inject, observer } from "mobx-react";

export default inject("appStore")(
  observer(({ appStore }) => {
    const { history } = appStore.user;
    return (
      <div>
        <ul className="history-head">
          <li>Date</li>
          <li>Accuracy</li>
          <li>Speed</li>
        </ul>
        {history.map(h => {
          const date = new Date(h.date);
          return (
            <ul className="history-content" key={date.getTime()}>
              <li>{date.toLocaleString("en-US")}</li>
              <li>{`${h.accuracy} %`}</li>
              <li>{`${h.wpm} WPM`}</li>
            </ul>
          );
        })}
      </div>
    );
  })
);
