import React from "react";

export default ({ accuracy, speed, onStart }) => {
  return (
    <div className="game-result">
      <div>
        <h3>Game results</h3>
        <p>{`Accuracy: ${accuracy} %`}</p>
        <p>{`Speed: ${speed} wpm`}</p>
      </div>
      <input
        className="btn btn-green-border"
        type="button"
        value="Start new game"
        onClick={onStart}
      />
    </div>
  );
};
