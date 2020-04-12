// import cards from './cardsArray';
import NavMenu from './nav-menu';
import { Card, CategoryCard, makeCategoryField, makeTrainField } from './card';


const menu = new NavMenu();
menu.init();

// makeCategoryField();
makeTrainField(7);
