import { observable, action, decorate } from "mobx";

import id from "../utils/id";
import { saveUserHistory } from "../actions/account-actions";

class GameStore {
  text;
  textSplited;
  currentText;
  index;
  isStarted;
  isFinished;

  speed;
  accuracy;
  time;
  intervalId;
  numberOfKeystroke;

  start = text => {
    this.text = text;
    this.textSplited = text
      .split(" ")
      .map(t => ({ id: id(), text: t, isWrong: null }));
    this.currentText = "";
    this.index = 0;
    this.isStarted = true;
    this.isFinished = false;
    this.accuracy = 0;
    this.speed = 0;
    this.time = 90;
    this.numberOfKeystroke = 0;
    this.startInterval();
  };

  stop = (forceStop = false) => {
    this.isStarted = false;
    clearInterval(this.intervalId);

    if (forceStop) {
      this.isFinished = false;
    } else {
      this.isFinished = true;
      saveUserHistory({
        wpm: this.speed,
        accuracy: this.accuracy,
        date: new Date()
      });
    }
  };

  calculateSpeed = () => {
    const wrongCount = this.textSplited.filter(t => t.isWrong === true).length;
    const rightCount = this.textSplited.filter(t => t.isWrong === false).length;
    const accurateWordPercentages =
      (rightCount / (wrongCount + rightCount)) * 100;

    if (Number.isNaN(accurateWordPercentages)) {
      this.speed = 0;
    } else {
      this.speed =
        (this.numberOfKeystroke / (120 - this.time)) * accurateWordPercentages;
    }
  };

  startInterval = () => {
    const self = this;
    this.intervalId = setInterval(() => {
      if (self.time !== 0) {
        self.time--;
      } else {
        self.stop();
      }
    }, 1000);
  };

  setNewText = text => {
    this.numberOfKeystroke++;

    const current = this.textSplited[this.index];
    current.isWrong = !current.text.startsWith(text.trim());

    if (
      !current.isWrong &&
      current.text.length === text.length - 1 &&
      text[text.length - 1] === " "
    ) {
      this.currentText = "";
      this.index++;
      if (this.index >= this.textSplited.length) {
        this.stop();
      }

      //this.calculateSpeed();
    } else {
      this.currentText = text;
    }
  };
}

decorate(GameStore, {
  text: observable,
  textSplited: observable,
  currentText: observable,
  speed: observable,
  accuracy: observable,
  time: observable,
  isStarted: observable,
  isFinished: observable,
  start: action,
  stop: action
});

const gameStore = new GameStore();

export default gameStore;
