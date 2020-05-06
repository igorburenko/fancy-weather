import { cards, category } from './cardsArray';

const CATEGORIES_AMOUNT = 8;

const statistic = {
  sortAscending: {
    word: true,
    translation: true,
    correct: true,
    wrong: true,
    trainCount: true,
    percent: true,
    category: true,
  },

  resetSortAscending(current) {
    for (let val in statistic.sortAscending) {
      if (val === current) continue;
      statistic.sortAscending[val] = true;
    }
  },

  createSortDropDown() {
    const layoutWrapper = document.createElement('div');
    layoutWrapper.classList.add('dropdown__layout-wrapper', 'hide');

    const layout = document.createElement('div');
    layout.classList.add('sort-button-dropdown__layout', 'close-zoom-up');

    const byEnglishName = this.createButton('word', 'sort-button-dropdown__item', this.sort, 'word');
    const byTranslation = this.createButton('translation', 'sort-button-dropdown__item', this.sort, 'translation');
    const byCorrect = this.createButton('correct answer', 'sort-button-dropdown__item', this.sort, 'correct');
    const byWrong = this.createButton('wrong answer', 'sort-button-dropdown__item', this.sort, 'wrong');
    const byTrain = this.createButton('train', 'sort-button-dropdown__item', this.sort, 'trainCount');
    const byPercent = this.createButton('percent', 'sort-button-dropdown__item', this.sort, 'percent');
    const byCategory = this.createButton('category', 'sort-button-dropdown__item', this.sort, 'category');

    layout.append(byEnglishName);
    layout.append(byTranslation);
    layout.append(byCorrect);
    layout.append(byWrong);
    layout.append(byTrain);
    layout.append(byPercent);
    layout.append(byCategory);
    layoutWrapper.append(layout);

    return layoutWrapper;
  },

  createTable(currentStatistic, isTableSorted = false) {
    const statsTable = document.createElement('table');
    statsTable.classList.add('stats__table');

    currentStatistic.forEach((card, index) => {
      if ((!isTableSorted && !((index) % CATEGORIES_AMOUNT)) || index < 1) {
        const categoryRow = document.createElement('tr');
        categoryRow.classList.add('stats__category-row');

        const categoryCellName = document.createElement('td');
        categoryCellName.classList.add('stats__category-cell-name');
        categoryCellName.textContent = category[Math.ceil(index / 8)];
        categoryCellName.setAttribute('colspan', '2');
        categoryCellName.dataset.id = 'word';
        categoryCellName.addEventListener('click', this.sort.bind(this));

        const nameEng = document.createElement('td');
        nameEng.classList.add('stats__category-cell-name');
        nameEng.textContent = 'Word';
        nameEng.dataset.id = 'word';
        nameEng.addEventListener('click', this.sort.bind(this));

        const nameRus = document.createElement('td');
        nameRus.classList.add('stats__category-cell-name');
        nameRus.textContent = 'Translation';
        nameRus.dataset.id = 'translation';
        nameRus.addEventListener('click', this.sort.bind(this));

        const categoryTrainIcon = this.createHeaderRowItems('360', 'trainCount');
        const categoryCorrectIcon = this.createHeaderRowItems('sentiment_satisfied_alt', 'correct');
        const categoryWrongIcon = this.createHeaderRowItems('sentiment_very_dissatisfied', 'wrong');
        const categoryPercentIcon = this.createHeaderRowItems('thumb_up', 'percent');

        if (isTableSorted) {
          categoryRow.append(categoryCellName);
        } else {
          categoryRow.append(nameEng);
          categoryRow.append(nameRus);
        }
        categoryRow.append(categoryCorrectIcon);
        categoryRow.append(categoryWrongIcon);
        categoryRow.append(categoryTrainIcon);
        categoryRow.append(categoryPercentIcon);
        statsTable.append(categoryRow);
      }

      const cardIndex = this.arrayIndexSearch(currentStatistic, card.word, 'word');
      const wordRow = document.createElement('tr');
      wordRow.classList.add('stats__word-row');
      const wordCellNameEng = document.createElement('td');
      wordCellNameEng.classList.add('stats__category-word-name');
      wordCellNameEng.textContent = card.word;
      const wordCellNameRu = document.createElement('td');
      wordCellNameRu.classList.add('stats__category-word-name');
      wordCellNameRu.textContent = card.translation;

      const wordTrainCount = document.createElement('td');
      wordTrainCount.classList.add('stats__word-train', 'stats__category-word-name');
      wordTrainCount.textContent = currentStatistic[cardIndex].trainCount;

      const wordCorrectCount = document.createElement('td');
      wordCorrectCount.classList.add('stats__word-train', 'stats__category-word-name');
      wordCorrectCount.textContent = currentStatistic[cardIndex].correct;

      const wordWrongCount = document.createElement('td');
      wordWrongCount.classList.add('stats__word-train', 'stats__category-word-name');
      wordWrongCount.textContent = currentStatistic[cardIndex].wrong;

      const wordPercentCount = document.createElement('td');
      wordPercentCount.classList.add('stats__word-train', 'stats__category-word-name');
      wordPercentCount.textContent = `${currentStatistic[cardIndex].percent}%`;

      wordRow.append(wordCellNameEng);
      wordRow.append(wordCellNameRu);
      wordRow.append(wordCorrectCount);
      wordRow.append(wordWrongCount);
      wordRow.append(wordTrainCount);
      wordRow.append(wordPercentCount);
      statsTable.append(wordRow);
    });
    return statsTable;
  },

  createHeaderRowItems(iconText, id) {
    const categoryIcon = document.createElement('td');
    categoryIcon.classList.add('stats__train-icon', 'statistic__icons');
    categoryIcon.innerHTML = `<span class="material-icons icons_blue">${iconText}</span>`;
    categoryIcon.dataset.id = id;
    categoryIcon.addEventListener('click', this.sort.bind(this));
    return categoryIcon;
  },

  createStatsField(repeatBtnHandler) {
    const currentStatistic = this.getStatisticFromStorage();

    const statsTableWrapper = document.createElement('div');
    statsTableWrapper.classList.add('stats__wrapper', 'cards');

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('stats__btn-wrapper');

    const btnSort = this.createButton('Sort by...', 'stat__button', this.showSortBtnDropDown);
    const btnRepeatDifficult = this.createButton('Repeat Difficult', 'stat__button', repeatBtnHandler);
    const btnResetStats = this.createButton('Reset', 'stat__button', this.resetStatistic);

    btnSort.append(this.createSortDropDown());
    buttonsWrapper.append(btnSort);
    buttonsWrapper.append(btnRepeatDifficult);
    buttonsWrapper.append(btnResetStats);
    // buttonsWrapper.append(this.createSortDropDown());

    const statsTable = this.createTable(currentStatistic);

    statsTableWrapper.append(buttonsWrapper);
    statsTableWrapper.append(statsTable);
    return statsTableWrapper;
  },

  showSortBtnDropDown() {
    const dropdown = document.querySelector('.sort-button-dropdown__layout');
    const dropdownWrapper = document.querySelector('.dropdown__layout-wrapper');

    if (dropdownWrapper.classList.contains('hide')) {
      dropdownWrapper.classList.remove('hide');
    } else {
      dropdown.addEventListener('transitionend', () => {
        dropdownWrapper.classList.add('hide');
      }, { once: true });
    }
    setTimeout(() => {
      dropdown.classList.toggle('close-zoom-up');
    }, 0);
  },

  calcStatisticPercent(correct, wrong) {
    if (!correct && !wrong) {
      return 0;
    }
    return Math.floor(+correct / (+correct + +wrong) * 100);
  },

  calculatePercentForStorage() {
    const stats = this.getStatisticFromStorage();
    stats.forEach((currentCard) => {
      currentCard.percent = this.calcStatisticPercent(currentCard.correct, currentCard.wrong);
    });
    this.saveStatisticToStorage(stats);
  },

  createButton(buttonName, buttonClass, buttonHandler, btnId = 'noid') {
    const btn = document.createElement('button');
    btn.classList.add(buttonClass);
    btn.textContent = buttonName;
    btn.dataset.id = btnId;
    btn.addEventListener('click', buttonHandler.bind(this));
    return btn;
  },

  initStatisticStorage() {
    const stats = [];
    cards.forEach((currentCategory) => {
      currentCategory.forEach((card) => {
        stats.push({
          word: card.word,
          translation: card.translation,
          image: card.image,
          audioSrc: card.audioSrc,
          correct: 0,
          wrong: 0,
          trainCount: 0,
          percent: 0,
        });
      });
    });
    this.saveStatisticToStorage(stats);
    return stats;
  },

  saveStatisticToStorage(statObject) {
    window.localStorage.statistic = JSON.stringify(statObject);
  },

  getStatisticFromStorage() {
    const stats = window.localStorage.statistic;
    return stats ? JSON.parse(window.localStorage.statistic) : this.initStatisticStorage();
  },

  resetStatistic() {
    const initStats = this.initStatisticStorage();
    this.saveStatisticToStorage(initStats);
    const newTable = this.createTable(initStats, false);
    document.querySelector('.stats__table').replaceWith(newTable);
  },

  addToStats(word, option) {
    const stats = this.getStatisticFromStorage();
    const index = this.arrayIndexSearch(stats, word);
    stats[index][option] += 1;
    this.saveStatisticToStorage(stats);
  },

  arrayIndexSearch(arr, searchItem, keyName = 'word') {
    return arr.findIndex(item => item[keyName] === searchItem);
  },

  sort(event) {
    const compareKey = event.currentTarget.dataset.id;
    let statisticList = this.getStatisticFromStorage();
    statisticList = this.sortArrayByKey(statisticList, compareKey);
    const isCategory = compareKey !== 'category';
    const newTable = this.createTable(statisticList, isCategory);
    document.querySelector('.stats__table').replaceWith(newTable);
  },

  sortArrayByKey(array, key) {
    if (key === 'category') {
      return array;
    }
    statistic.resetSortAscending(key);
    if (this.sortAscending[key]) {
      if (key === 'word' || key === 'translation') {
        array.sort((a, b) => a[key] - b[key]);
      } else {
        array.sort((a, b) => (a[key] > b[key] ? -1 : 1));
      }
    } else if (key === 'word' || key === 'translation') {
      array.sort((a, b) => (a[key] > b[key] ? -1 : 1));
    } else {
      array.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    }
    this.sortAscending[key] = !this.sortAscending[key];
    return array;
  },
};

export default statistic;
