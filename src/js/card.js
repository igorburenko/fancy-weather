import { cards, category } from './cardsArray';

class Card {
  constructor(word, translation, image, audioSrc) {
    this.word = word;
    this.translation = translation;
    this.image = `/assets/${image}`;
    this.audioSrc = `/assets/${audioSrc}`;
  }

  renderCard() {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card__container');

    const card = document.createElement('div');
    card.classList.add('card', 'train-card');

    const cardFront = document.createElement('div');
    cardFront.classList.add('train-card__front');
    cardFront.setAttribute('style', `background-image: url(${this.image})`);

    cardFront.textContent = this.word;

    const iconTurn = document.createElement('i');
    iconTurn.classList.add('material-icons', 'md-dark', 'md-30');
    iconTurn.textContent = '360';

    cardFront.appendChild(iconTurn);

    const cardBack = document.createElement('div');
    cardBack.classList.add('train-card__back');
    cardBack.setAttribute('style', `background-image: url(${this.image})`);

    cardBack.textContent = this.translation;

    const cardAudio = document.createElement('audio');
    cardAudio.src = this.audioSrc;

    card.appendChild(cardFront);
    card.appendChild(cardBack);
    card.appendChild(cardAudio);

    card.addEventListener('click', event => Card.onCardClick(event));
    card.addEventListener('mouseleave', event => Card.mouseLeaveCard(event));

    cardContainer.appendChild(card);
    return cardContainer;
  }

  static onCardClick(event) {
    if (event.target.tagName === 'I') {
      event.target.offsetParent.offsetParent.classList.add('rotate');
    } else {
      // console.log(event);
      event.path[1].querySelector('audio').play();
    }
  }

  static mouseLeaveCard(event) {
    event.target.classList.remove('rotate');
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
//
// function makeTrainField(categoryNumber) {
//   const field = document.createElement('div');
//   field.classList.add('cards');
//   field.id = 'cards-container';
//   cards[categoryNumber].forEach((card) => {
//     const element = new Card(card.word, card.translation, card.image, card.audioSrc);
//     field.append(element.renderCard());
//   });
//   document.querySelector('.cards').replaceWith(field);
// }
//
// function setCategory(event) {
//   if (event.toElement.id !== 'cards-container') {
//     const categoryId = event.path.reverse()[7].id;
//     makeTrainField(categoryId);
//     // menu.showCategoriesMenu();
//     // menu.activateMenuItem(event);
//     // menu.activateCategoryItem(event);
//
//     // TODO: активирует пункт меню который выбарн
//   }
// }
//
// function makeCategoryField() {
//   const field = document.createElement('div');
//   field.classList.add('cards');
//   field.id = 'cards-container';
//   category.forEach((cardsCategory, index) => {
//     const card = new CategoryCard(cardsCategory, cards[index][0].image, index);
//     field.append(card.renderCard());
//   });
//   field.addEventListener('click', event => setCategory(event));
//   document.querySelector('.cards').replaceWith(field);
// }

export {
  Card, CategoryCard,
};
