import { getRateById, startSearch, mySwiper } from './controller';

const searchBtn = document.querySelector('.search__button');
const clearBtn = document.querySelector('.search-icon__clear');
const keyboardBtn = document.querySelector('.search-icon__keyboard');
const inputSearch = document.querySelector('.search__input');
const searchForm = document.querySelector('.main__search');
const searchSpinner = document.querySelector('.search-spinner');
const errorField = document.querySelector('.server-answer__error');
const swiperLoader = document.querySelector('.swiper-loader__wrapper');
const virtualKeyboard = document.querySelector('.keyboard__wrapper');

searchBtn.addEventListener('click', startSearch);
clearBtn.addEventListener('click', resetSearchForm);
keyboardBtn.addEventListener('click', toggleKeyboard);

function toggleKeyboard() {
  virtualKeyboard.classList.toggle('keyboard__wrapper_active');
  inputSearch.focus();
}

async function addNewSliderItems(data) {
  const swiperItems = await data.map(async (film) => {
    const rate = await getRateById(film.imdbID);
    const poster = film.Poster !== 'N/A' ? film.Poster : './assets/img/poster-not-avalible.jpg';
    const year = film.Year.length === 5 ? film.Year.substr(0, 4) : film.Year;
    const filmCard = document.createElement('div');
    filmCard.classList.add('swiper-slide');
    filmCard.innerHTML = `
            <div class="inner">
              <a href="https://www.imdb.com/title/${film.imdbID}/" target="_blank"><p class="slider__title">${film.Title}</p></a>
              <div class="slider__poster-wrapper">
                <div class="slider__front">
                    <img src="${poster}" alt="poster" class="slider__poster">
                </div>
              </div>
              <div class="slider__year">${year}</div>
              <div class="slider__rating"><span class="material-icons">star</span>${rate}</div>
            </div>`;
    return filmCard;
  });
  await Promise.all(swiperItems).then(val => mySwiper.appendSlide(val));
  mySwiper.init();
}

function showError(error) {
  hideSearchSpinner();
  if (error === 'Movie not found!') {
    errorField.textContent = `No results for ${inputSearch.value}`;
    return;
  }
  errorField.textContent = error;
}

function showSearchSpinner() {
  clearBtn.classList.add('hide');
  searchSpinner.classList.remove('hide');
}

function hideSearchSpinner() {
  clearBtn.classList.remove('hide');
  searchSpinner.classList.add('hide');
}

const transitionToPromise = (el, property, value) => new Promise((resolve) => {
  el.style[property] = value;
  const transitionEnded = (e) => {
    if (e.propertyName !== property) return;
    el.removeEventListener('transitionend', transitionEnded);
    resolve();
  };
  el.addEventListener('transitionend', transitionEnded);
});

async function showSwiperLoader() {
  swiperLoader.classList.remove('hide');
  await transitionToPromise(swiperLoader, 'opacity', '1');
}

async function hideSwiperLoader() {
  // swiperLoader.classList.add('hide_opacity');
  await transitionToPromise(swiperLoader, 'opacity', '0');
  swiperLoader.classList.add('hide');
}

function resetSearchForm() {
  searchForm.reset();
  inputSearch.focus();
}

export {
  addNewSliderItems, showError, showSearchSpinner, hideSearchSpinner,
  showSwiperLoader, hideSwiperLoader, searchSpinner, inputSearch, searchForm,
};
