import { cards, category } from './cardsArray';

class Statistic {
  init(repeatBtnHandler) {
    const currentStatistic = Statistic.getStatisticFromStorage();

    const statsTableWrapper = document.createElement('div');
    statsTableWrapper.classList.add('stats__wrapper', 'cards');

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('stats__btn-wrapper');
    const btnRepeatDifficult = this.createButton('Repeat Difficult', 'stat__button', repeatBtnHandler);
    const btnResetStats = this.createButton('Reset', 'stat__button', Statistic.resetStatistic);
    // const btnResetStats = this.createButton('Reset', 'stat__button', Statistic.getStatisticFromStorage);
    buttonsWrapper.append(btnRepeatDifficult);
    buttonsWrapper.append(btnResetStats);

    const statsTable = document.createElement('table');
    statsTable.classList.add('stats__table');

    cards.forEach((categoryArray, index) => {
      const categoryRow = document.createElement('tr');
      categoryRow.classList.add('stats__category-row');
      const categoryCellName = document.createElement('td');
      categoryCellName.classList.add('stats__category-cell-name');
      categoryCellName.textContent = category[index];
      categoryCellName.setAttribute('colspan', '2');

      // TODO: возле каждого слова указывается статистика - сколько раз по карточке с данным словом
      //  кликали в режиме тренировки, сколько раз данное слово угадывали в режиме игры, сколько
      //  ошибок при этом допустили, процент ошибок по каждому слову. После перезагрузке приложения
      //  статистика сохраняется
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

      categoryRow.append(categoryCellName);
      categoryRow.append(categoryCorrectIcon);
      categoryRow.append(categoryWrongIcon);
      categoryRow.append(categoryTrainIcon);
      categoryRow.append(categoryPercentIcon);
      statsTable.append(categoryRow);

      categoryArray.forEach((card) => {
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
        wordTrainCount.textContent = currentStatistic[card.word].trainCount;

        const wordCorrectCount = document.createElement('td');
        wordCorrectCount.classList.add('stats__word-train', 'stats__category-word-name');
        wordCorrectCount.textContent = currentStatistic[card.word].correct;

        const wordWrongCount = document.createElement('td');
        wordWrongCount.classList.add('stats__word-train', 'stats__category-word-name');
        wordWrongCount.textContent = currentStatistic[card.word].wrong;

        const wordPercentCount = document.createElement('td');
        const correctPercent = Statistic.calcStatisticPercent(currentStatistic[card.word].correct,
          currentStatistic[card.word].wrong);
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

    statsTableWrapper.append(buttonsWrapper);
    statsTableWrapper.append(statsTable);
    return statsTableWrapper;
  }

  static calcStatisticPercent(correct, wrong) {
    if (!correct && !wrong) {
      return 0;
    }
    return Math.floor(+correct / (+correct + +wrong) * 100);
  }

  createButton(buttonName, buttonClass, buttonHandler) {
    // const btnWrapper = document.createElement('div');
    // btnWrapper.classList.add('button__wrapper');
    const btn = document.createElement('button');
    btn.classList.add(buttonClass);
    btn.textContent = buttonName;
    btn.addEventListener('click', buttonHandler);
    // btnWrapper.append(btn);
    return btn;
  }

  static initStatisticStorage() {
    const stats = {};
    cards.forEach((currentCategory) => {
      currentCategory.forEach((card) => {
        stats[card.word] = {
          correct: 0,
          wrong: 0,
          trainCount: 0,
        };
      });
    });
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
    statistic[word][option] += 1;
    Statistic.saveStatisticToStorage(statistic);
  }
}

export default Statistic;
