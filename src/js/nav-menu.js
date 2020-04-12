import { makeCategoryField, makeTrainField } from './card';

class NavMenu {
  constructor() {
    this.elements = {
      menu: document.querySelector('.menu'),
      menuItems: document.querySelectorAll('.menu__item'),
      categoriesList: document.querySelector('.menu__category-list'),
      categoryItems: document.querySelectorAll('.category-item'),
    };
  }

  init() {
    const menuButton = document.querySelector('.header__burger');
    const menuItems = document.querySelector('.menu__items');
    menuButton.addEventListener('click', () => this.toggleMenu());
    menuItems.addEventListener('click', event => this.changeMenuItem(event));
  }

  // TODO: сделать забор и генерацию  меню категориес из массива карточек

  toggleMenu() {
    this.elements.menu.classList.toggle('close');
  }

  changeMenuItem(event) {
    if (event.target.tagName === 'SPAN') {
      this.activateMenuItem(event);
      this.activateCategoryItem(event, true);
      if (event.target.textContent === 'Main Page') {
        this.loadMainMenu();
      }
      if (event.target.id === 'categories') {
        this.showCategoriesMenu();
      } else {
        this.hideCategoriesMenu();
        this.toggleMenu();
      }
    } else if (event.target.tagName === 'LI') {
      // console.log(event.target.id);
      this.loadCategory(event.target.id);
      this.activateCategoryItem(event);
      this.toggleMenu();
    }
  }

  activateMenuItem(event) {
    this.elements.menuItems.forEach(item => item.classList.remove('menu-item_active'));
    event.target.classList.add('menu-item_active');
  }

  activateCategoryItem(event, deactivate = false) {
    this.elements.categoryItems.forEach(item => item.classList.remove('category-item_active'));
    if (!deactivate) {
      event.target.classList.add('category-item_active');
    }
  }

  showCategoriesMenu() {
    this.elements.categoriesList.classList.remove('hide');
    setTimeout(() => {
      this.elements.categoriesList.classList.remove('close-zoom-up');
    }, 0);
  }

  hideCategoriesMenu() {
    this.elements.categoriesList.classList.add('close-zoom-up');
    this.elements.categoriesList.classList.add('hide');
  }

  loadMainMenu() {
    makeCategoryField();
  }

  loadCategory(categoryNumber) {
    makeTrainField(categoryNumber);
  }
}

export default NavMenu;
