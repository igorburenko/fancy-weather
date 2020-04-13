import { cards, category } from './cardsArray';

class Card {
  constructor(word, translation, image, audioSrc) {
    this.word = word;
    this.translation = translation;
    this.image = `/assets/${image}`;
    this.audioSrc = audioSrc;
  }

  renderCard() {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card__container');

    const card = document.createElement('div');
    card.classList.add('card', 'train-card');

    const cardFront = document.createElement('div');
    cardFront.classList.add('train-card__front');
    cardFront.setAttribute('style', `background-image: url(${this.image})`);

    const frontTitle = document.createElement('p');
    frontTitle.textContent = this.word;

    const iconTurn = document.createElement('i');
    iconTurn.classList.add('material-icons', 'md-dark', 'md-30');
    iconTurn.textContent = '360';

    cardFront.appendChild(frontTitle);
    cardFront.appendChild(iconTurn);

    const cardBack = document.createElement('div');
    cardBack.classList.add('train-card__back');
    cardBack.setAttribute('style', `background-image: url(${this.image})`);

    const backTitle = document.createElement('p');
    backTitle.textContent = this.translation;

    cardBack.appendChild(backTitle);

    card.appendChild(cardFront);
    card.appendChild(cardBack);

    card.addEventListener('click', event => Card.onClick(event));
    card.addEventListener('mouseleave', event => this.mouseLeave(event));

    cardContainer.appendChild(card);
    return cardContainer;
  }

  static onClick(event) {
    if (event.target.tagName === 'I') {
      event.target.offsetParent.offsetParent.classList.add('rotate');
    }
  }

  mouseLeave(event) {
    event.target.classList.remove('rotate');
    // console.log(event);
  }
}

class CategoryCard {
  constructor(title, image, id) {
    this.title = title;
    this.image = `./assets/${image}`;
    this.id = id;
  }

  renderCard() {
    const cardCategory = document.createElement('div');
    cardCategory.classList.add('card', 'card__category');
    cardCategory.textContent = this.title;
    cardCategory.id = this.id;

    const categoryImage = document.createElement('img');
    categoryImage.setAttribute('src', this.image);
    categoryImage.setAttribute('alt', this.title);

    cardCategory.prepend(categoryImage);

    return cardCategory;
  }
}

function makeCategoryField() {
  const field = document.createElement('div');
  field.classList.add('cards');
  category.forEach((cardsCategory, index) => {
    const card = new CategoryCard(cardsCategory, cards[index][0].image, index);
    field.append(card.renderCard());
  });
  document.querySelector('.cards').replaceWith(field);
}

function makeTrainField(categoryNumber) {
  const field = document.createElement('div');
  field.classList.add('cards');
  cards[categoryNumber].forEach((card) => {
    const element = new Card(card.word, card.translation, card.image, card.audioSrc);
    field.append(element.renderCard());
  });
  document.querySelector('.cards').replaceWith(field);
}

export {
  Card, CategoryCard, makeCategoryField, makeTrainField,
};
