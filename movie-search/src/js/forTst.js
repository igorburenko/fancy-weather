function isCyrillic(text) {
  return /[а-я]/i.test(text);
}

module.exports = { isCyrillic };
