import React from "react";

export default ({
  time,
  speed,
  textSplited,
  currentText,
  onTyped,
  onStart
}) => {
  return (
    <div>
      <div className="game-info">
        <p>{`Time: ${time}`}</p>
        <p>{`Speed: ${speed} wpm`}</p>
        <p>{`Accuracy:  ${speed} %`}</p>
      </div>
      <div className="game-text">
        {textSplited.map(part => {
          let className = "txt";
          if (part.isWrong === true) {
            className = "wrong-txt";
          }
          if (part.isWrong === false) {
            className = "right-txt";
          }
          return (
            <span key={part.id} className={className}>{`${part.text} `}</span>
          );
        })}
      </div>
      <div className="game-inp">
        <input type="text" value={currentText} onChange={onTyped} />
      </div>
      <div className="text-center">
        <input
          className="btn btn-green-border"
          type="button"
          value="Restart game"
          onClick={onStart}
        />
      </div>
    </div>
  );
};
