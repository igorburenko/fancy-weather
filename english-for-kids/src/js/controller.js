import NavMenu from './nav-menu';
import { cards, category } from './cardsArray';
import { Card, GameCard, CategoryCard } from './card';
import Game from './gameController';

const trainSwitch = document.querySelector('.train__switch');
let menu;
let game = { gameStart: false };

const resultsBar = {
  resBar: document.querySelector('.results'),
  show() { this.resBar.classList.remove('hide'); },
  hide() { this.resBar.classList.add('hide'); },
  reset() { this.resBar.innerHTML = ''; },
  addAnswer(correct = true) {
    const smileEmotion = `sentiment_${correct ? 'satisfied_alt' : 'very_dissatisfied'}`;
    const color = correct ? 'color-main-dark' : 'color-pink';
    this.resBar.innerHTML = `<span class="material-icons ${color} md-30">${smileEmotion}</span>${this.resBar.innerHTML}`;
  },
};

function makeTrainField(categoryNumber) {
  // TODO: Добавить названия категории в верх страницы категорий
  const field = document.createElement('div');
  field.classList.add('cards');
  field.id = 'cards-container';
  cards[categoryNumber].forEach((card) => {
    const element = new Card(card.word, card.translation, card.image, card.audioSrc);
    field.append(element.renderCard());
  });
  document.querySelector('.cards').replaceWith(field);
}


function receiveAnswer(event) {
  if (game.gameStart) {
    if (event.currentTarget === game.gameAray[0]) {
      resultsBar.addAnswer(true);
      const oldCard = game.shiftGuessedCard();
      oldCard.removeEventListener('click', receiveAnswer);
      oldCard.classList.add('inactive');
      game.correctAnswer += 1;
      if (game.gameAray.length === 0) {
        // eslint-disable-next-line no-use-before-define
        return gameOver();
      }
      game.playAnswerSound(true).play();
      setTimeout(() => game.playSound(), 1000);
    } else {
      resultsBar.addAnswer(false);
      game.playAnswerSound(false).play();
      game.wrongAnswer += 1;
    }
  }
  // console.log(game.wrongAnswer, game.correctAnswer);
}

function createRepeatButton(gameObj) {
  const button = document.querySelector('.button__start');
  button.addEventListener('click', () => gameObj.playSound());
  button.innerHTML = '<span class="material-icons md-36">replay</span>';
  button.classList.add('repeat');
}

function startGame() {
  resultsBar.reset();
  resultsBar.show();
  game = new Game(document.querySelectorAll('.card__game'));
  createRepeatButton(game);
  game.gameStart = true;
}

function gameOver() {
  game.gameStart = false;
  const cardsField = document.querySelector('.cards');
  const gameOverField = makeGameOverField()
  cardsField.replaceWith(gameOverField);
  if (game.wrongAnswer) {
    gameOverField.querySelector('.audio-failure').play();
  } else {
    gameOverField.querySelector('.audio-success').play();
  }
  setTimeout(makeCategoryField, 4000);
}

function makeGameOverField() {
  const imgSrc = `/assets/img/${game.wrongAnswer ? 'failure.png' : 'success.png'}`;
  const gameOverField = document.createElement('div');
  gameOverField.classList.add('cards');
  const picture = document.createElement('img');
  picture.classList.add('final-image');
  picture.setAttribute('src', imgSrc);
  picture.setAttribute('alt', 'final-image');
  gameOverField.append(picture);
  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('final-title__wrapper');
  const title = document.createElement('h3');
  if (game.wrongAnswer) {
    title.textContent = `Количество допущенных ошибок: ${game.wrongAnswer}`;
  }
  titleWrapper.append(title);
  gameOverField.append(titleWrapper);

  const audioAnswerSuccess = document.createElement('audio');
  audioAnswerSuccess.src = '/assets/audio/success.mp3';
  audioAnswerSuccess.classList.add('audio-success');
  const audioAnswerFailure = document.createElement('audio');
  audioAnswerFailure.src = '/assets/audio/failure.mp3';
  audioAnswerFailure.classList.add('audio-failure');
  gameOverField.append(audioAnswerSuccess);
  gameOverField.append(audioAnswerFailure);

  return gameOverField;
}

function createStartButton() {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('button__wrapper');
  const btn = document.createElement('button');
  btn.classList.add('button__start');
  btn.textContent = 'Start Game';
  btn.addEventListener('click', startGame, { once: true });
  btnWrapper.append(btn);
  return btnWrapper;
}


function makeGameField(categoryNumber) {
  // TODO: Добавить названия категории в верх страницы категорий
  const field = document.createElement('div');
  field.classList.add('cards');
  field.id = 'cards-container';
  cards[categoryNumber].forEach((card) => {
    const element = new GameCard(card.word, card.translation, card.image, card.audioSrc);
    const cardRender = element.renderCard();
    cardRender.addEventListener('click', receiveAnswer);
    field.append(cardRender);
  });
  field.append(createStartButton());

  const audioAnswerCorrect = document.createElement('audio');
  audioAnswerCorrect.src = '/assets/audio/correct.mp3';
  audioAnswerCorrect.classList.add('audio-correct');
  const audioAnswerWrong = document.createElement('audio');
  audioAnswerWrong.src = '/assets/audio/error.mp3';
  audioAnswerWrong.classList.add('audio-wrong');

  field.append(audioAnswerCorrect);
  field.append(audioAnswerWrong);


  document.querySelector('.cards').replaceWith(field);
  game.gameStart = false;
}

function setCategory(event) {
  const categoryId = event.currentTarget.dataset.id;
  // TODO: закрывание меню если оно открыто
  if (menu.state.open) {
    menu.toggleMenu();
  }
  (menu.state.trainMode ? makeTrainField : makeGameField)(categoryId);
  menu.showCategoriesMenu();
  menu.activateMenuItem('categories');
  menu.activateCategoryItem(categoryId);
}

function setGameColor() {
  // TODO: сделать установку цвета интерфейса в зависимости от режима игра/тренировка
  const primaryColoredElements = document.querySelectorAll('.global__color');
  const secondaryColoredElements = document.querySelectorAll('.global-second__color');
  primaryColoredElements.forEach((element) => {
    element.style.background = menu.state.trainMode ? '#86d6de' : '#decf6e';
  });
  secondaryColoredElements.forEach((element) => {
    element.style.background = menu.state.trainMode ? '#decf6e' : '#86d6de';
  });
}

function makeCategoryField() {
  resultsBar.hide();
  const field = document.createElement('div');
  field.classList.add('cards');
  field.id = 'cards-container';
  category.forEach((cardsCategory, index) => {
    const card = new CategoryCard(cardsCategory, cards[index][0].image, index);
    const cardRender = card.renderCard();
    cardRender.addEventListener('click', event => setCategory(event));
    field.append(cardRender);
  });
  document.querySelector('.cards').replaceWith(field);

  setGameColor();
}

function showStatistic() {
  // TODO: сделать функцию отображающую страницу статистики
  console.log('showing stats');

  /* Страница статистики:
 страница со статистикой содержит перечень всех категорий, всех слов в каждой категории,
 перевод каждого слова. Минимальная ширина, при которой страница статистики отображается
 корректно – 320 рх: (+10)
 возле каждого слова указывается статистика - сколько раз по карточки с данным словом
 кликали в режиме тренировки, сколько раз данное слово угадывали в режиме игры, сколько
 ошибок при этом допустили, процент ошибок по каждому слову. После перезагрузки приложения
 статистика сохраняется: (+10)
 есть возможность сортировки данных по алфавиту, для числовых значений - по их величине.
  Сортировка может происходить в прямом и обратном порядке и должна охватывать весь диапазон
  данных: (+10)
 на странице со статистикой размещены кнопки "Repeat difficult words" и "Reset". Кнопка "Reset"
 обнуляет статистику. При клике по кнопке "Repeat difficult words" открывается страница изучения
 слов с наибольшим процентом ошибок аналогичная странице категории. На странице "Repeat difficult
 words" может размещаться от нуля до восьми слов, в зависимости от того сколько слов угадывалось
 в режиме игры и при их угадывании были допущены ошибки. После нажатия на кнопку "Reset"
 количество слов на странице "Repeat difficult words" равно нулю: (+10)
 реализован дополнительный, не предусмотренный заданием функционал. Не оценивается, но, если
 можете сделать лучше, почему бы и нет.
 */
}

const menuActions = {
  menuAction() {
    menu.toggleMenu();
    menu.hideCategoriesMenu();
    resultsBar.hide();
  },
  main_page() {
    makeCategoryField();
    this.menuAction();
  },
  categories() {
    menu.showCategoriesMenu();
  },
  statistic() {
    showStatistic();
    this.menuAction();
  },
};

function onClickMenuItem(event) {
  if (event.target.classList.contains('menu__item')) {
    menu.activateMenuItem(event.target.id);
    menu.deactivateCategoryItem(event);
    menuActions[event.target.id]();
  } else if (event.target.classList.contains('category-item')) {
    menu.toggleMenu();
    (trainSwitch.checked ? makeTrainField : makeGameField)(event.target.attributes['data-id'].value);
    menu.activateCategoryItem(event.target.attributes['data-id'].value);
  }
}

function onClickMenuBurgerButton() {
  menu.toggleMenu();
  // TODO: заменять иконку бургера на иконку крестика
}

function changeGameMode(trainMode) {
  menu.state.trainMode = trainMode;
  resultsBar.hide();
  setGameColor(trainMode);
  if (menu.state.categoryItem) {
    (trainMode ? makeTrainField : makeGameField)(menu.state.categoryItem);
  }
  const switchTitle = document.querySelector('.lever');
  switchTitle.textContent = trainMode ? 'TRAIN' : 'GAME';
  menu.activateCategoryItem(menu.state.categoryItem);
}

function activateListeners() {
  // TODO: перенести активацию всех листенеров сюда
  menu.elements.menuList.addEventListener('click', event => onClickMenuItem(event));
  menu.elements.menuButton.addEventListener('click', () => onClickMenuBurgerButton());
  menu.elements.closeIcon.addEventListener('click', onClickMenuBurgerButton);
  trainSwitch.addEventListener('change', event => changeGameMode(event.target.checked));
}

document.addEventListener('DOMContentLoaded', () => {
  menu = new NavMenu();
  activateListeners();
}, { once: true });

export default makeCategoryField;
