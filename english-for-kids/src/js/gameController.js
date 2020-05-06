class Game {
  constructor(gameFieldNode) {
    this.gameAray = Array.from(Game.shuffle(gameFieldNode));
    this.playSound();
    this.audioCorrect = document.querySelector('.audio-correct');
    this.audioWrong = document.querySelector('.audio-wrong');
    this.audioSuccess = document.querySelector('.audio-success');
    this.audioFailure = document.querySelector('.audio-failure');
    this.gameStart = true;
    this.correctAnswer = 0;
    this.wrongAnswer = 0;
  }

  playSound() {
    if (this.gameAray[0]) {
      this.gameAray[0].querySelector('audio').play();
    }
  }

  shiftGuessedCard() {
    return this.gameAray.shift();
  }

  getAnswerSound(correct = true) {
    return correct ? this.audioCorrect : this.audioWrong;
  }

  static shuffle(arr) {
    let j;
    let tmp;
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      tmp = array[j];
      array[j] = array[i];
      array[i] = tmp;
    }
    return array;
  }
}

export default Game;
