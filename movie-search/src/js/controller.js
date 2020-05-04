import {
  addNewSliderItems, hideSearchSpinner,
  inputSearch, searchForm, searchSpinner,
  showError, showSearchSpinner, showSwiperLoader} from './view';
import Swiper from 'swiper';

let curPage = 1;
let pageResults = 0;
let searchUrl = 'https://www.omdbapi.com/?apikey=4af4c20c&s=terminator&page=';
let mySwiper = createSwiperInstance();


async function getData(url) {
  const res = await fetch(url);
  return await res.json();
}

function searchMovie(url = searchUrl, page = curPage) {
  if (searchUrl !== url) {
    searchUrl = url;
    curPage = 1;
  }
  getData(url + page)
  //TODO: возникающие ошибки в работе с API (прерывание соединения в ходе запроса,
  // возвращаемые ошибки от API типа 4xx, 5xx) также обрабатываются клиентом и
  // выводятся в область уведомления об ошибке
    .then((body) => {
      console.log(body);
      if (body.Response === 'True') {

        if (curPage === 1) {
          mySwiper.removeAllSlides();
          // mySwiper.slideTo(0, 1, false);
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
  const idGetUrl = `http://www.omdbapi.com/?i=${id}&plot=full&apikey=4af4c20c`;
  return getData(idGetUrl)
    .then((data) => {
      // console.log(data);
      return data.imdbRating;
    });
}

async function startSearch(event) {
  event.preventDefault();
  showSwiperLoader();
  let searchQuery = inputSearch.value;
  if (isCyrillic(searchQuery)) {
    searchQuery = await translateRussian(searchQuery).then(translation => translation[0]);
  }
  console.log(searchQuery);
  const url = `https://www.omdbapi.com/?apikey=4af4c20c&s=${searchQuery}&page=`;
  searchMovie(url, 1);
  showError(`Showing results for ${searchQuery}`);
  showSearchSpinner();
}

function isCyrillic(text) {
  return /[а-я]/i.test(text);
}

function translateRussian(text) {
  let url = 'https://translate.yandex.net/api/v1.5/tr.json/translate' +
    '?key=trnsl.1.1.20200425T120214Z.7df2562a38fe836d.f604c2224ea5a5b2ea79f898a389af7e75097a12' +
    `&text=${text}` +
    '&lang=ru-en';
  return getData(url).then(data => data.text);
}

function createSwiperInstance() {
  return new Swiper('.swiper-container', {
    init: false,
    slidesPerView: 1,
    spaceBetween: 10,
    preloadImages: true,
    updateOnImagesReady: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 1,
    },

    breakpoints: {
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
      progress: function(data) {
        if (data === 1 && curPage < pageResults) {
          curPage += 1;
          searchMovie();
        }
      },
    },
  })
}

function pictureOnLoad() {
  console.log('loaded pict');
  hideSearchSpinner();
}

mySwiper.on('init', function() { console.log('INITIALISE') });

export {getRateById, searchMovie, startSearch, mySwiper};
