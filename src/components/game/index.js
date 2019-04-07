import React from "react";
import { inject, observer } from "mobx-react";

import GameResult from "./game-result";
import GameArea from "./game-area";
import { startNewGame } from "../../actions/game-actions";

export default inject("gameStore")(
  observer(
    class Game extends React.Component {
      onStart = () => {
        startNewGame();
      };

      onTyped = e => {
        const { setNewText } = this.props.gameStore;
        setNewText(e.target.value);
      };

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
                textSplited={textSplited}
                currentText={currentText}
                onTyped={this.onTyped}
              />
            )}
            {!isStarted && !isFinished && (
              <div>
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
