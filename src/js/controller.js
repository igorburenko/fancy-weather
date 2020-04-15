import NavMenu from './nav-menu';
import { cards, category } from './cardsArray';
import { Card, CategoryCard } from './card';

const menu = new NavMenu();

(function () {
  // TODO: перенести активацию всех листенеров сюда
  menu.elements.menuItems.addEventListener('click', event => menu.changeMenuItem(event));
  menu.elements.menuButton.addEventListener('click', () => menu.toggleMenu());
}());

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

function setCategory(event) {
  if (event.toElement.id !== 'cards-container') {
    const categoryId = event.path.reverse()[7].id;
    makeTrainField(categoryId);
    // menu.showCategoriesMenu();
    // menu.activateMenuItem(event);
    // menu.activateCategoryItem(event);

    // TODO: активирует пункт меню который выбарн
  }
}

function makeCategoryField() {
  const field = document.createElement('div');
  field.classList.add('cards');
  field.id = 'cards-container';
  category.forEach((cardsCategory, index) => {
    const card = new CategoryCard(cardsCategory, cards[index][0].image, index);
    field.append(card.renderCard());
  });
  field.addEventListener('click', event => setCategory(event));
  document.querySelector('.cards').replaceWith(field);
}


export {
  makeCategoryField, makeTrainField, menu,
};
