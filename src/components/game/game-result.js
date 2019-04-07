import React from "react";

export default ({ accuracy, speed, onStart }) => {
  return (
    <div>
      <p>{`Accuracy: ${accuracy} %`}</p>
      <p>{`Speed: ${speed} wpm`}</p>
      <input
        className="btn btn-green-border"
        type="button"
        value="Start new game"
        onClick={onStart}
      />
    </div>
  );
};
