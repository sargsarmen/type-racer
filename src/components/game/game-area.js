import React from "react";

export default ({
  time,
  speed,
  accuracy,
  textSplited,
  currentText,
  onTyped,
  onChange,
  onStart
}) => {
  return (
    <div>
      <div className="game-info">
        <p>{`Time: ${time}`}</p>
        <p>{`Speed: ${speed} wpm`}</p>
        <p>{`Accuracy:  ${accuracy} %`}</p>
      </div>
      <div className="game-text">
        {textSplited.map(part => {
          return part.word.map((char, index) => {
            let className = "txt",
              text = char.char;

            if (char.isWrong === true) {
              className = "wrong-txt";
            }
            if (char.isWrong === false) {
              className = "right-txt";
            }
            if (index === part.word.length - 1) {
              text += " ";
            }

            return (
              <span key={char.id} className={className}>
                {text}
              </span>
            );
          });
        })}
      </div>
      <div className="game-inp">
        <input
          type="text"
          value={currentText}
          onKeyUp={onTyped}
          onChange={onChange}
        />
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
