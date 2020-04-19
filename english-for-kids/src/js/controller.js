import NavMenu from './nav-menu';
import { cards, category } from './cardsArray';
import { Card, GameCard, CategoryCard } from './card';
import Game from './gameController';
import statistic from './statistic';

const trainSwitch = document.querySelector('.train__switch');
const appContainer = document.querySelector('.main-wrapper');
let menu;
let game = { gameStart: false };
let difficultCards = [];

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

function makeFieldTemplate(categoryId) {
  const fieldTemplate = document.createElement('div');
  fieldTemplate.classList.add('cards');
  fieldTemplate.id = 'cards-container';
  const currentCategory = document.createElement('div');
  currentCategory.classList.add('current-category');
  currentCategory.textContent = categoryId === 'difficult' ? 'Difficult Words' : category[categoryId];
  fieldTemplate.append(currentCategory);
  return fieldTemplate;
}

function makeTrainField(cardsArray, categoryId) {
  const field = makeFieldTemplate(categoryId);
  cardsArray.forEach((card) => {
    const element = new Card(card.word, card.translation, card.image, card.audioSrc);
    field.append(element.renderCard(statistic.addToStats.bind(statistic)));
  });
  document.querySelector('.cards').replaceWith(field);
}

function receiveAnswer(event) {
  if (game.gameStart) {
    if (event.currentTarget === game.gameAray[0]) {
      statistic.addToStats(game.gameAray[0].dataset.id, 'correct');
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
      statistic.addToStats(game.gameAray[0].dataset.id, 'wrong');
      resultsBar.addAnswer(false);
      game.playAnswerSound(false).play();
      game.wrongAnswer += 1;
    }
  }
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

function gameOver() {
  game.gameStart = false;
  const cardsField = document.querySelector('.cards');
  const gameOverField = makeGameOverField();
  cardsField.replaceWith(gameOverField);
  if (game.wrongAnswer) {
    gameOverField.querySelector('.audio-failure').play();
  } else {
    gameOverField.querySelector('.audio-success').play();
  }
  setTimeout(makeCategoryField, 2500);
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

function makeGameField(cardsArray, categoryId) {
  const field = makeFieldTemplate(categoryId);
  cardsArray.forEach((card) => {
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
  if (menu.state.open) {
    menu.toggleMenu();
  }
  (menu.state.trainMode ? makeTrainField : makeGameField)(cards[categoryId], categoryId);
  menu.showCategoriesMenu();
  menu.activateMenuItem('categories');
  menu.activateCategoryItem(categoryId);
}

function setGameColor() {
  const primaryColoredElements = document.querySelectorAll('.global__color');
  const secondaryColoredElements = document.querySelectorAll('.global-second__color');
  primaryColoredElements.forEach((element) => {
    element.style.background = menu.state.trainMode ? '#86d6de' : '#decf6e';
  });
  secondaryColoredElements.forEach((element) => {
    element.style.background = menu.state.trainMode ? '#decf6e' : '#86d6de';
  });
  const header = document.querySelector('.header');
  header.style.background = menu.state.trainMode ? '#a4d1d64f' : '#decf6e4f';
}

function makeCategoryField() {
  resultsBar.hide();
  menu.activateMenuItem('main_page');
  menu.deactivateCategoryItem();
  menu.hideCategoriesMenu();
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

function repeatDifficult() {
  menu.state.categoryItem = 'difficult';
  statistic.calculatePercentForStorage();
  const cardsStat = statistic.sortArrayByKey(statistic.getStatisticFromStorage(), 'percent');
  difficultCards = cardsStat.filter(card => card.percent > 0).reverse().splice(0, 8);
  (trainSwitch.checked ? makeTrainField : makeGameField)(difficultCards, menu.state.categoryItem);
}

function showStatistic() {
  resultsBar.hide();
  statistic.calculatePercentForStorage();
  const statisticField = statistic.createStatsField(repeatDifficult);
  document.querySelector('.cards').replaceWith(statisticField);
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
    const categoryId = event.target.attributes['data-id'].value;
    (trainSwitch.checked ? makeTrainField : makeGameField)(cards[categoryId], categoryId);
    menu.activateCategoryItem(event.target.attributes['data-id'].value);
  }
}

function closeMenuOnClickToBody(event) {
  const isBurgerButton = event.target.classList.contains('burger');
  if (menu.state.open && !isBurgerButton) {
    menu.toggleMenu();
  }
}

function onClickMenuBurgerButton() {
  menu.toggleMenu();
}

function changeGameMode(isTrainMode) {
  menu.state.trainMode = isTrainMode;
  resultsBar.hide();
  setGameColor(isTrainMode);
  if (menu.state.categoryItem) {
    const cardsToPlay = menu.state.categoryItem === 'difficult' ? difficultCards : cards[menu.state.categoryItem];
    (isTrainMode ? makeTrainField : makeGameField)(cardsToPlay, menu.state.categoryItem);
  }
  const switchTitle = document.querySelector('.lever');
  switchTitle.textContent = isTrainMode ? 'TRAIN' : 'GAME';
  menu.activateCategoryItem(menu.state.categoryItem);
}

function activateListeners() {
  // TODO: активация всех листенеров тут
  menu.elements.menuList.addEventListener('click', event => onClickMenuItem(event));
  menu.elements.menuButton.addEventListener('click', onClickMenuBurgerButton);
  menu.elements.closeIcon.addEventListener('click', onClickMenuBurgerButton);
  trainSwitch.addEventListener('change', event => changeGameMode(event.target.checked));
  appContainer.addEventListener('click', closeMenuOnClickToBody);
}

document.addEventListener('DOMContentLoaded', () => {
  menu = new NavMenu();
  activateListeners();
}, { once: true });

export { makeCategoryField, showStatistic };
