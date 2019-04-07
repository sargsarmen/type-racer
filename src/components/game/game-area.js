import React from "react";

export default ({ time, speed, textSplited, currentText, onTyped }) => {
  return (
    <div>
      <div>
        <p>{`${time}`}</p>
        <p>{`${speed} wpm`}</p>
      </div>
      <div>
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
      <div>
        <input type="text" value={currentText} onChange={onTyped} />
      </div>
    </div>
  );
};
