import React from "react";
import { inject, observer } from "mobx-react";

import GameResult from "./game-result";
import GameArea from "./game-area";
import { startNewGame } from "../../actions/game-actions";

export default inject("gameStore")(
  observer(
    class Game extends React.Component {
      componentDidMount() {
        const { stop } = this.props.gameStore;
        stop(true);
      }

      componentWillUnmount() {
        const { stop } = this.props.gameStore;
        stop(true);
      }

      onStart = () => {
        startNewGame();
      };

      onTyped = e => {
        const { setNewText } = this.props.gameStore;
        setNewText(e.key, e.keyCode);
      };

      onChange = e => {};

      render() {
        const {
          isStarted,
          isFinished,
          textSplited,
          currentText,
          accuracy,
          speed,
          time
        } = this.props.gameStore;

        return (
          <div className="marg-tb-20">
            {isStarted && !isFinished && (
              <GameArea
                time={time}
                speed={speed}
                accuracy={accuracy}
                textSplited={textSplited}
                currentText={currentText}
                onTyped={this.onTyped}
                onStart={this.onStart}
                onChange={this.onChange}
              />
            )}
            {!isStarted && !isFinished && (
              <div className="start-game">
                <h3>Improve your typing skills on your own</h3>
                <input
                  className="btn btn-green-border"
                  type="button"
                  value="Start game"
                  onClick={this.onStart}
                />
              </div>
            )}
            {!isStarted && isFinished && (
              <GameResult
                accuracy={accuracy}
                speed={speed}
                onStart={this.onStart}
              />
            )}
          </div>
        );
      }
    }
  )
);
