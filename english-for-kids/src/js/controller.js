import NavMenu from './nav-menu';
import { cards, category } from './cardsArray';
import { Card, GameCard, CategoryCard } from './card';

const trainSwitch = document.querySelector('.train__switch');
const menu = new NavMenu();

function makeTrainField(categoryNumber) {
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
  console.dir(trainSwitch);
}

function makeGameField(categoryNumber) {
  const field = document.createElement('div');
  field.classList.add('cards');
  field.id = 'cards-container';
  cards[categoryNumber].forEach((card) => {
    const element = new GameCard(card.word, card.translation, card.image, card.audioSrc);
    const cardRender = element.renderCard();
    cardRender.addEventListener('click', event => receiveAnswer(event));
    field.append(cardRender);
  });
  document.querySelector('.cards').replaceWith(field);
}

function setCategory(event) {
  const categoryId = event.currentTarget.dataset.id;
  (menu.state.trainMode ? makeTrainField : makeGameField)(categoryId);
  menu.showCategoriesMenu();
  menu.activateMenuItem('categories');
  menu.activateCategoryItem(categoryId);
}

function makeCategoryField() {
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
}

const menuActions = {
  main_page: () => {
    makeCategoryField();
    menu.toggleMenu();
    menu.hideCategoriesMenu();
  },
  categories: () => menu.showCategoriesMenu(),
  statistic: () => {
    showStatistic();
    menu.toggleMenu();
    menu.hideCategoriesMenu();
  },
};

function onClickMenuItem(event) {
  if (event.target.classList.contains('menu__item')) {
    menu.activateMenuItem(event.target.id);
    menu.deactivateCategoryItem(event);
    menuActions[event.target.id]();
  } else if (event.target.classList.contains('category-item')) {
    (trainSwitch.checked ? makeTrainField : makeGameField)(event.target.attributes['data-id'].value);
    menu.activateCategoryItem(event.target.attributes['data-id'].value);
    menu.toggleMenu();
  }
}

function onClickMenuBurgerButton() {
  menu.toggleMenu();
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

function changeGameMode(trainMode) {
  menu.state.trainMode = trainMode;
  setGameColor(trainMode);
  if (menu.state.categoryItem) {
    (trainMode ? makeTrainField : makeGameField)(menu.state.categoryItem);
  }
  // menu.state.trainMode = trainMode;
  const switchTitle = document.querySelector('.lever');
  switchTitle.textContent = trainMode ? 'TRAIN' : 'GAME';
  const results = document.querySelector('.results');
  results.classList.toggle('hide_opacity');
  menu.activateCategoryItem(menu.state.categoryItem);
}

(function () {
  // TODO: перенести активацию всех листенеров сюда
  menu.elements.menuList.addEventListener('click', event => onClickMenuItem(event));
  menu.elements.menuButton.addEventListener('click', () => onClickMenuBurgerButton());
  trainSwitch.addEventListener('change', event => changeGameMode(event.target.checked));
}());

export default makeCategoryField;
