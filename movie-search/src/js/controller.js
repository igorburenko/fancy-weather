import Swiper from 'swiper';
import {
  addNewSliderItems,
  hideSearchSpinner,
  inputSearch,
  searchForm,
  searchSpinner,
  showError,
  showSearchSpinner,
  showSwiperLoader,
  hideSwiperLoader,
  rotatePoster, createPosterBackField,
} from './view';
import VirtualKeyboard from './keyboard';

let curPage = 1;
let pageResults = 0;
let searchUrl = 'https://www.omdbapi.com/?apikey=4af4c20c&s=terminator&page=';
let mySwiper = createSwiperInstance();
let lastSearchQuery = 'terminator';
console.log('Click to the card for additional functionality');

const keyboard = new VirtualKeyboard();
keyboard.init();
keyboard.toggleVirtualKeys();

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

function searchMovie(url = searchUrl, page = curPage) {
  if (searchUrl !== url) {
    searchUrl = url;
    curPage = 1;
  }
  getData(url + page)
  // TODO: возникающие ошибки в работе с API (прерывание соединения в ходе запроса,
  //  возвращаемые ошибки от API типа 4xx, 5xx) также обрабатываются клиентом и
  //  выводятся в область уведомления об ошибке
  // TODO: остановка лоадеров при ошибке
    .then((body) => {
      // console.log(body);
      if (body.Response === 'True') {
        if (curPage === 1) {
          showSwiperLoader();
          mySwiper.removeAllSlides();
          mySwiper.destroy(false, false);
          mySwiper = createSwiperInstance();
        }
        pageResults = Math.ceil(body.totalResults / 10);
        addNewSliderItems(body.Search);
      } else {
        showError(body.Error);
      }
    });
}

function getRateById(id) {
  const idGetUrl = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=4af4c20c`;
  return getData(idGetUrl).then(data => data.imdbRating);
}

async function startSearch(event) {
  event && event.preventDefault();

  let searchQuery = inputSearch.value;
  if (isCyrillic(searchQuery)) {
    searchQuery = await translateRussian(searchQuery)
      .then(translation => translation[0]);
  }
  console.log(searchQuery);
  if (searchQuery === lastSearchQuery) return;
  lastSearchQuery = searchQuery;
  const url = `https://www.omdbapi.com/?apikey=4af4c20c&s=${searchQuery}&page=`;
  searchMovie(url, 1);
  showError(`Showing results for ${searchQuery}`);
  showSearchSpinner();
}

function isCyrillic(text) {
  return /[а-я]/i.test(text);
}

function translateRussian(text) {
  const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate'
    + '?key=trnsl.1.1.20200425T120214Z.7df2562a38fe836d.f604c2224ea5a5b2ea79f898a389af7e75097a12'
    + `&text=${text}`
    + '&lang=ru-en';
  return getData(url).then(data => data.text);
}

function createSwiperInstance() {
  return new Swiper('.swiper-container', {
    init: false,
    slidesPerView: 1,
    spaceBetween: 0,
    preloadImages: true,
    updateOnImagesReady: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 1,
    },

    breakpoints: {
      1439: {
        slidesPerView: 4,
      },
      1201: {
        slidesPerView: 3,
      },

      701: {
        slidesPerView: 2,
      },

      700: {
        slidesPerView: 1,
      },

      501: {
        spaceBetween: -40,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      imagesReady: () => pictureOnLoad(),
      click: onClickSlider,
      progress(data) {
        if (data === 1 && curPage < pageResults) {
          curPage += 1;
          searchMovie();
        }
      },
    },
  });
}

async function onClickSlider(event) {
  let posterId = event.path.filter(el => (el.dataset && el.dataset.name === 'poster'));
  if (posterId.length) {
    posterId = posterId[0].id;
    const currentPoster = document.getElementById(posterId);
    if (currentPoster.dataset.loaded) return rotatePoster(posterId);

    const idGetUrl = `https://www.omdbapi.com/?i=${posterId}&plot=full&apikey=4af4c20c`;
    const cardData = await getData(idGetUrl).then(data => data);
    createPosterBackField(cardData);
    currentPoster.dataset.loaded = '1';
    rotatePoster(posterId);
  }
}

function pictureOnLoad() {
  hideSearchSpinner();
  hideSwiperLoader();
}

// TODO: подключён jest, написаны 2-3 юнит-теста (+10)
// TODO: ошибки, возникающие во время выполнения запросов к API, обрабатываются
//  и выводятся в область уведомления об ошибках +1
export {
  getRateById, searchMovie, startSearch, mySwiper,
};
