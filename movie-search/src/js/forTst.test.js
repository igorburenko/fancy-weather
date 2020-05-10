const state = require('./forTst');

describe('controller isCyrillic', () => {
  it('Should be defined', () => {
    expect(state.isCyrillic('терминатор')).toBeDefined();
  });

  it('Should be Boolean', () => {
    expect(typeof state.isCyrillic('терминатор')).toBe('boolean');
  });

  it('Should be true', () => {
    expect(state.isCyrillic('терминатор')).toBe(true);
    expect(state.isCyrillic('Вася')).toBe(true);
    expect(state.isCyrillic('Администратор')).toBe(true);
    expect(state.isCyrillic('Украина')).toBe(true);
    expect(state.isCyrillic('термоджывоажфдлыоинатор')).toBe(true);
  });

  it('Should be false', () => {
    expect(state.isCyrillic('Terminator')).toBe(false);
    expect(state.isCyrillic('Vasily')).toBe(false);
    expect(state.isCyrillic('Admin')).toBe(false);
    expect(state.isCyrillic('USA')).toBe(false);
    expect(state.isCyrillic('sjdaklhfjlkshflkashdlfkj')).toBe(false);
  });
});
