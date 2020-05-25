import Swiper from 'swiper';
import {
  addNewSliderItems,
  hideSearchSpinner,
  inputSearch,
  showWarning,
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
console.log('Дополнительный, не предусмотренный заданием функционал доступен при клике на постер');

const keyboard = new VirtualKeyboard();
keyboard.init();
keyboard.toggleVirtualKeys();

const searchBtn = document.querySelector('.search__button');
searchBtn.addEventListener('click', startSearch);

async function getData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    showWarning('Ошибка, проверьте ваше подключение!');
  }
}

function searchMovie(url = searchUrl, page = curPage) {
  if (searchUrl !== url) {
    searchUrl = url;
    curPage = 1;
  }
  getData(url + page)
    .then((body) => {
      if (body.Response === 'True') {
        if (curPage === 1) {
          showSwiperLoader();
          mySwiper.removeAllSlides();
          mySwiper.destroy(false, false);
          mySwiper = createSwiperInstance();
        }
        const resultsPerRequest = 10;
        pageResults = Math.ceil(body.totalResults / resultsPerRequest);
        addNewSliderItems(body.Search);
      } else {
        showWarning(body.Error);
      }
    }).catch(() => console.log('Возникла ошибка связи с сервером.'));
}

function getRateById(id) {
  const idGetUrl = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=4af4c20c`;
  return getData(idGetUrl)
    .then(data => data.imdbRating)
    .catch(() => showWarning('Проверьте соединение с сетью'));
}

async function startSearch(event) {
  (event && event.preventDefault());

  let searchQuery = inputSearch.value;
  if (searchQuery === '') return showWarning('Nothing To Search');
  if (isCyrillic(searchQuery)) {
    searchQuery = await translateRussian(searchQuery)
      .then(translation => translation[0])
      .catch(error => console.log(`Возникла ошибка связи с сервером. Подробности: ${error}`));
  }
  if (searchQuery === lastSearchQuery) return showWarning('Let\'s look for something new');
  lastSearchQuery = searchQuery;
  const url = `https://www.omdbapi.com/?apikey=4af4c20c&s=${searchQuery}&page=`;
  searchMovie(url, 1);
  showWarning(`Showing results for ${searchQuery}`);
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
  return getData(url).then(data => data.text).catch(() => showWarning('Яндекс переводчик не отвечает.'));
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

function searchTarget(target) {
  while (target !== document) {
    if (target.dataset.name === 'poster') {
      return target;
    }
    target = target.parentNode;
  }
  return null;
}


async function onClickSlider(event) {
  try {
    let posterId = searchTarget(event.target);
    if (posterId) {
      posterId = posterId.id;
      const currentPoster = document.getElementById(posterId);
      if (currentPoster.dataset.loaded) return rotatePoster(posterId);

      const idGetUrl = `https://www.omdbapi.com/?i=${posterId}&plot=full&apikey=4af4c20c`;
      const cardData = await getData(idGetUrl)
        .then(data => data);
      createPosterBackField(cardData);
      currentPoster.dataset.loaded = '1';
      rotatePoster(posterId);
    }
  } catch (e) {
    console.log('Ошибка проверьте сеть!');
  }
}

function pictureOnLoad() {
  hideSearchSpinner();
  hideSwiperLoader();
}

export {
  searchMovie, getRateById, startSearch, mySwiper, isCyrillic,
};
