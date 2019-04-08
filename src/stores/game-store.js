import { observable, action, decorate } from "mobx";

import id from "../utils/id";
import { saveUserHistory } from "../actions/account-actions";
import { isAlphaNumeric, isBackspace, isSpace } from "../utils/keyCodeHelpers";

const gameDuration = 120;
class GameStore {
  text;
  textSplited;
  currentText;
  charIndex;
  index;
  isStarted;
  isFinished;
  speed;
  accuracy;
  time;
  errorsCount;
  totalCount;
  intervalId;

  start = text => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.text = text;
    this.textSplited = text.split(" ").map(t => ({
      word: t.split("").map(c => ({ id: id(), char: c, isWrong: null }))
    }));

    this.currentText = "";
    this.charIndex = 0;
    this.index = 0;

    this.isStarted = true;
    this.isFinished = false;
    this.accuracy = 0;
    this.speed = 0;
    this.time = gameDuration;
    this.errorsCount = 0;
    this.totalCount = 0;
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

  calculateMetrics = () => {
    if (this.errorsCount === 0 && this.totalCount > 0) {
      this.accuracy = 100;
    } else if (this.totalCount === 0) {
      this.accuracy = 0;
    } else {
      this.accuracy = (
        ((this.totalCount - this.errorsCount) * 100) /
        this.totalCount
      ).toFixed(1);
    }
    this.speed = (
      (this.totalCount / 5 - this.errorsCount) /
      ((gameDuration - this.time) / 60)
    ).toFixed(0);
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

  setNewText = (key, keyCode) => {
    const currentWord = this.textSplited[this.index].word;
    const currentChar = currentWord[this.charIndex];
    const hasCurrentWordError = currentWord.some(cw => cw.isWrong);

    if (isAlphaNumeric(keyCode)) {
      if (hasCurrentWordError && this.charIndex === currentWord.length) {
        return;
      }
      this.currentText += key;
      currentChar.isWrong = currentChar.char !== key;
      if (currentChar.isWrong) {
        this.errorsCount++;
      }
      this.charIndex++;
      this.totalCount++;
    }

    if (isBackspace(keyCode)) {
      this.currentText = this.currentText.substring(
        0,
        this.currentText.length - 1
      );
      if (this.charIndex > 0) {
        this.charIndex--;
        const newCurrentChar = currentWord[this.charIndex];
        newCurrentChar.isWrong = null;
      } else {
        if (this.index > 0) {
          this.index--;
          const newCurrentWord = this.textSplited[this.index];
          this.charIndex = newCurrentWord.word.length;
        }
      }
    }

    if (isSpace(keyCode)) {
      if (this.charIndex === currentWord.length) {
        this.charIndex = 0;
        this.index++;
        if (!this.textSplited.some(w => w.word.some(w => w.isWrong))) {
          this.currentText = "";
        } else {
          this.currentText += " ";
        }
        this.totalCount++;
      }
    }

    if (
      this.index === this.textSplited.length - 1 &&
      this.charIndex === currentWord.length
    ) {
      this.stop();
    }
    this.calculateMetrics();
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
