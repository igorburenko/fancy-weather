class NavMenu {
  constructor() {
    this.state = {
      trainMode: true,
      categoryItem: undefined,
    };
    this.elements = {
      menu: document.querySelector('.menu'),
      menuList: document.querySelector('.menu__items'),
      menuItems: document.querySelectorAll('.menu__item'),
      categoriesList: document.querySelector('.menu__category-list'),
      categoryItems: document.querySelectorAll('.category-item'),
      menuButton: document.querySelector('.header__burger'),
    };
  }
  // TODO: генерировать список  меню категориес из массива карточек

  toggleMenu() {
    this.elements.menu.classList.toggle('close');
  }

  activateMenuItem(itemId) {
    this.elements.menuItems.forEach(item => item.classList.remove('menu-item_active'));
    this.elements.menuItems.forEach((item) => {
      if (item.id === itemId) {
        item.classList.add('menu-item_active');
      }
    });
  }

  deactivateCategoryItem() {
    this.elements.categoryItems.forEach(item => item.classList.remove('category-item_active', 'category-item_active_second_color'));
    this.state.categoryItem = undefined;
  }

  activateCategoryItem(itemId) {
    if (itemId) {
      this.deactivateCategoryItem();
      const color = this.state.trainMode ? 'category-item_active' : 'category-item_active_second_color';
      this.elements.categoryItems[itemId].classList.add(color);
      this.state.categoryItem = itemId;
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
}

export default NavMenu;
