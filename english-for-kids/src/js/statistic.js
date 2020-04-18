import { cards, category } from './cardsArray';

class Statistic {
  createSortDropDown() {
    const layoutWrapper = document.createElement('div');
    layoutWrapper.classList.add('dropdown__layout-wrapper', 'hide');

    const layout = document.createElement('div');
    layout.classList.add('sort-button-dropdown__layout', 'close-zoom-up');

    const byEnglishName = this.createButton('word', 'sort-button-dropdown__item', Statistic.sort, 'word');
    const byTranslation = this.createButton('translation', 'sort-button-dropdown__item', Statistic.sort, 'translation');
    const byCorrect = this.createButton('correct answer', 'sort-button-dropdown__item', Statistic.sort, 'correct');
    const byWrong = this.createButton('wrong answer', 'sort-button-dropdown__item', Statistic.sort, 'wrong');
    const byTrain = this.createButton('train', 'sort-button-dropdown__item', Statistic.sort, 'trainCount');
    const byPercent = this.createButton('percent', 'sort-button-dropdown__item', Statistic.sort, 'percent');
    const byCategory = this.createButton('category', 'sort-button-dropdown__item', Statistic.sort, 'category');

    layout.append(byEnglishName);
    layout.append(byTranslation);
    layout.append(byCorrect);
    layout.append(byWrong);
    layout.append(byTrain);
    layout.append(byPercent);
    layout.append(byCategory);
    layoutWrapper.append(layout);

    return layoutWrapper;
  }

  static createTable(currentStatistic, sortTable = false) {
    const statsTable = document.createElement('table');
    statsTable.classList.add('stats__table');

    currentStatistic.forEach((card, index) => {
      if ((!sortTable && !((index) % 8)) || index < 1) {
        const categoryRow = document.createElement('tr');
        categoryRow.classList.add('stats__category-row');

        const categoryCellName = document.createElement('td');
        categoryCellName.classList.add('stats__category-cell-name');
        categoryCellName.textContent = category[Math.ceil(index / 8)];
        categoryCellName.setAttribute('colspan', '2');

        const nameEng = document.createElement('td');
        nameEng.classList.add('stats__category-cell-name');
        nameEng.textContent = 'Word';

        const nameRus = document.createElement('td');
        nameRus.classList.add('stats__category-cell-name');
        nameRus.textContent = 'Translation';

        const categoryTrainIcon = document.createElement('td');
        categoryTrainIcon.classList.add('stats__train-icon', 'statistic__icons');
        categoryTrainIcon.innerHTML = '<span class="material-icons icons_blue">360</span>';

        const categoryCorrectIcon = document.createElement('td');
        categoryCorrectIcon.classList.add('stats__correct-icon', 'statistic__icons');
        categoryCorrectIcon.innerHTML = '<span class="material-icons icons_blue">sentiment_satisfied_alt</span>';

        const categoryWrongIcon = document.createElement('td');
        categoryWrongIcon.classList.add('stats__wrong-icon', 'statistic__icons');
        categoryWrongIcon.innerHTML = '<span class="material-icons icons_pink">sentiment_very_dissatisfied</span>';

        const categoryPercentIcon = document.createElement('td');
        categoryPercentIcon.classList.add('stats__percent-icon', 'statistic__icons');
        categoryPercentIcon.innerHTML = '<span class="material-icons icons_blue">thumb_up</span>';

        if (!sortTable) {
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

      const cardIndex = Statistic.arrayIndexSearch(currentStatistic, card.word, 'word');
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
  }

  createStatsField(repeatBtnHandler) {
    const currentStatistic = Statistic.getStatisticFromStorage();

    const statsTableWrapper = document.createElement('div');
    statsTableWrapper.classList.add('stats__wrapper', 'cards');

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('stats__btn-wrapper');

    const btnSort = this.createButton('Sort by...', 'stat__button', this.showSortBtnDropDown);
    const btnRepeatDifficult = this.createButton('Repeat Difficult', 'stat__button', repeatBtnHandler);
    const btnResetStats = this.createButton('Reset', 'stat__button', Statistic.resetStatistic);

    btnSort.append(this.createSortDropDown());
    buttonsWrapper.append(btnSort);
    buttonsWrapper.append(btnRepeatDifficult);
    buttonsWrapper.append(btnResetStats);
    // buttonsWrapper.append(this.createSortDropDown());

    const statsTable = Statistic.createTable(currentStatistic);

    statsTableWrapper.append(buttonsWrapper);
    statsTableWrapper.append(statsTable);
    return statsTableWrapper;
  }

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
  }

  static calcStatisticPercent(correct, wrong) {
    if (!correct && !wrong) {
      return 0;
    }
    return Math.floor(+correct / (+correct + +wrong) * 100);
  }

  static calculatePercentForStorage() {
    const stats = Statistic.getStatisticFromStorage();
    const newStats = stats.map((card) => {
      card.percent = Statistic.calcStatisticPercent(card.correct, card.wrong);
      return card;
    });
    Statistic.saveStatisticToStorage(newStats);
  }

  createButton(buttonName, buttonClass, buttonHandler, btnId = 'noid') {
    const btn = document.createElement('button');
    btn.classList.add(buttonClass);
    btn.textContent = buttonName;
    btn.dataset.id = btnId;
    btn.addEventListener('click', buttonHandler);
    return btn;
  }

  static initStatisticStorage() {
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
    Statistic.saveStatisticToStorage(stats);
    return stats;
  }

  static saveStatisticToStorage(statObject) {
    window.localStorage.statistic = JSON.stringify(statObject);
  }

  static getStatisticFromStorage() {
    const stats = window.localStorage.statistic;
    return stats ? JSON.parse(window.localStorage.statistic) : Statistic.initStatisticStorage();
  }

  static resetStatistic() {
    const initStats = Statistic.initStatisticStorage();
    Statistic.saveStatisticToStorage(initStats);
    const newTable = Statistic.createTable(initStats, false);
    document.querySelector('.stats__table').replaceWith(newTable);
  }

  static addToStats(word, option) {
    const statistic = Statistic.getStatisticFromStorage();
    const index = Statistic.arrayIndexSearch(statistic, word);
    statistic[index][option] += 1;
    Statistic.saveStatisticToStorage(statistic);
  }

  static arrayIndexSearch(arr, searchItem, keyName = 'word') {
    return arr.findIndex(item => item[keyName] === searchItem);
  }

  static sort(event) {
    const compareKey = event.currentTarget.dataset.id;
    let statisticList = Statistic.getStatisticFromStorage();
    statisticList = Statistic.sortArrayByKey(statisticList, compareKey);
    const isCategory = compareKey !== 'category';
    const newTable = Statistic.createTable(statisticList, isCategory);
    document.querySelector('.stats__table').replaceWith(newTable);
  }

  static sortArrayByKey(array, key) {
    if (key === 'word' || key === 'translation') {
      array.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    } else {
      array.sort((a, b) => (a[key] > b[key] ? -1 : 1));
    }
    return array;
  }
}

export default Statistic;
