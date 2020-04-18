import { cards, category } from './cardsArray';

class Statistic {
  init() {
    // this.sortDropDown = document.querySelector('.sort-button-dropdown__layout');
  }

  createSortDropDown() {
    const layoutWrapper = document.createElement('div');
    layoutWrapper.classList.add('dropdown__layout-wrapper');

    const layout = document.createElement('div');
    layout.classList.add('sort-button-dropdown__layout', 'close-zoom-up');

    const byEnglishName = this.createButton('by word', 'sort-button-dropdown__item', Statistic.sort, 'word');
    const byTranslation = this.createButton('by translation', 'sort-button-dropdown__item', Statistic.sort, 'translation');
    const byCorrect = this.createButton('by correct answer', 'sort-button-dropdown__item', Statistic.sort, 'correct');
    const byWrong = this.createButton('by wrong answer', 'sort-button-dropdown__item', Statistic.sort, 'wrong');
    const byTrain = this.createButton('by train', 'sort-button-dropdown__item', Statistic.sort, 'trainCount');
    const byPercent = this.createButton('by percent', 'sort-button-dropdown__item', Statistic.sort);

    layout.append(byEnglishName);
    layout.append(byTranslation);
    layout.append(byCorrect);
    layout.append(byWrong);
    layout.append(byTrain);
    layout.append(byPercent);
    layoutWrapper.append(layout);

    return layoutWrapper;
  }

  static createTable(currentStatistic, sortTable = false) {
    const statsTable = document.createElement('table');
    statsTable.classList.add('stats__table');

    cards.forEach((categoryArray, index) => {
      if (!sortTable || index < 1) {
        const categoryRow = document.createElement('tr');
        categoryRow.classList.add('stats__category-row');

        const categoryCellName = document.createElement('td');
        categoryCellName.classList.add('stats__category-cell-name');
        categoryCellName.textContent = category[index];
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

      categoryArray.forEach((card) => {
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
        // wordTrainCount.textContent = currentStatistic[card.word].trainCount;
        wordTrainCount.textContent = currentStatistic[cardIndex].trainCount;

        const wordCorrectCount = document.createElement('td');
        wordCorrectCount.classList.add('stats__word-train', 'stats__category-word-name');
        wordCorrectCount.textContent = currentStatistic[cardIndex].correct;

        const wordWrongCount = document.createElement('td');
        wordWrongCount.classList.add('stats__word-train', 'stats__category-word-name');
        wordWrongCount.textContent = currentStatistic[cardIndex].wrong;

        const wordPercentCount = document.createElement('td');
        const correctPercent = Statistic.calcStatisticPercent(currentStatistic[cardIndex].correct,
          currentStatistic[cardIndex].wrong);
        wordPercentCount.classList.add('stats__word-train', 'stats__category-word-name');
        wordPercentCount.textContent = `${correctPercent}%`;

        wordRow.append(wordCellNameEng);
        wordRow.append(wordCellNameRu);
        wordRow.append(wordCorrectCount);
        wordRow.append(wordWrongCount);
        wordRow.append(wordTrainCount);
        wordRow.append(wordPercentCount);
        statsTable.append(wordRow);
      });
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
    document.querySelector('.sort-button-dropdown__layout').classList.toggle('close-zoom-up');
  }

  static calcStatisticPercent(correct, wrong) {
    if (!correct && !wrong) {
      return 0;
    }
    return Math.floor(+correct / (+correct + +wrong) * 100);
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
          correct: 0,
          wrong: 0,
          trainCount: 0,
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
    Statistic.saveStatisticToStorage(Statistic.initStatisticStorage());
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
    // TODO: при клике на кнопку сортировки запускаем функцию мейк сорт статистик,
    //  она принимает опцию по которой сортироваться будет
    // TODO: Отрисовывается сортировка без названий категорий.
    // TODO: Верхняя колонка синяя, дальше все колонки желтые
    const statisticList = Statistic.getStatisticFromStorage();
    if (compareKey === 'word') {
      statisticList.sort((a, b) => (a[compareKey] > b[compareKey] ? 1 : -1));
    } else if (compareKey === 'trainCount') {
      statisticList.sort((a, b) => (a[compareKey] > b[compareKey] ? -1 : 1));
    }
    const newTable = Statistic.createTable(statisticList, true);
    // console.log(statisticList);
    document.querySelector('.stats__table').replaceWith(newTable);
  }
}

export default Statistic;
