import { getRateById, startSearch, mySwiper } from './controller'

const searchBtn = document.querySelector('.search__button');
const clearBtn = document.querySelector('.search-icon__clear');
const keyboardBtn = document.querySelector('.search-icon__keyboard');
const inputSearch = document.querySelector('.search__input');
const searchForm = document.querySelector('.main__search');
const searchSpinner = document.querySelector('.search-spinner');
const errorField = document.querySelector('.server-answer__error');
const swiperLoader = document.querySelector('.swiper-loader__wrapper');

searchBtn.addEventListener('click', startSearch);
clearBtn.addEventListener('click', resetSearchForm);

async function addNewSliderItems(data) {
  const swiperItems = await data.map(async film => {
    const rate = await getRateById(film.imdbID);
    const poster = film.Poster !== 'N/A' ? film.Poster : './assets/img/poster-not-avalible.jpg';
    const year = film.Year.length === 5 ? film.Year.substr(0, 4) : film.Year;
    const filmCard = document.createElement('div');
    filmCard.classList.add('swiper-slide');
    filmCard.innerHTML = `
            <div class="inner">
              <a href="https://www.imdb.com/title/${film.imdbID}/" target="_blank"><p class="slider__title">${film.Title}</p></a>
              <div class="slider__poster-wrapper">
                  <img src="${poster}" alt="poster" class="slider__poster">
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
  if (error === 'Movie not found!') {
    errorField.textContent = `No results for ${inputSearch.value}`;
    return
  }
  errorField.textContent = error;
}

function showSearchSpinner() {
  clearBtn.classList.add('hide');
  searchSpinner.classList.remove('hide');
}

function showSwiperLoader() {
  swiperLoader.classList.remove('hide_opacity');
}

function hideSearchSpinner() {
  clearBtn.classList.remove('hide');
  searchSpinner.classList.add('hide');
  swiperLoader.classList.add('hide_opacity');
}

function resetSearchForm() {
  searchForm.reset();
  inputSearch.focus();
}

export {addNewSliderItems, showError, showSearchSpinner, hideSearchSpinner, showSwiperLoader, searchSpinner, inputSearch, searchForm};
