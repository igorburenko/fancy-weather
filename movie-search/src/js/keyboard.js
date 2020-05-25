
import { startSearch } from './controller';

class VirtualKeyboard {
  constructor() {
    this.elements = {};

    this.virtualKeyboardLayout = '';

    this.elements.input = document.querySelector('.search__input');

    this.props = {
      textValue: '',
      shift: false,
      lang: window.localStorage.lang || 'eng',
    };

    this.keyLayout = {
      eng: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '\\'],
        ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Enter'],
        ['Lang', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', 'Up', '.'],
        ['/', 'Space', 'Left', 'Down', 'Right'],
      ],

      engShift: [['!', '@', '#', '$', '%', '&', '*', '(', ')', '_', 'Backspace'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '"'],
        ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Enter'],
        ['Lang', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '+', 'Up', '-'],
        ['<', '>', '*', '=', '?', 'Space', 'Left', 'Down', 'Right'],
      ],

      ru: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'],
        ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
        ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'Enter'],
        ['Lang', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'Up', 'ю'],
        ['CapsLock', '/', 'э', 'Space', 'ё', 'ъ', 'Left', 'Down', 'Right'],
      ],

      ruShift: [['!', '"', '%', ':', ',', '.', '*', '(', ')', '_', 'Backspace'],
        ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
        ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'Enter'],
        ['Lang', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'Up', 'ю'],
        ['CapsLock', '/', 'Space', 'э', 'ё', 'ъ', 'Left', 'Down', 'Right'],
      ],
    };
  }


  renderNewKeyboard(language) {
    this.elements.newKeysWrapper = document.createElement('div');
    this.elements.newKeysWrapper.classList.add('keyboard__keys');
    this.elements.newKeysWrapper.appendChild(this.makeKeys(language));
    this.elements.oldKeyboard = document.querySelector('.keyboard__keys');
    this.elements.oldKeyboard.replaceWith(this.elements.newKeysWrapper);
    this.toggleVirtualKeys();
  }

  init() {
    const wrapper = document.querySelector('.keyboard__wrapper');

    this.elements.keysWrapper = document.createElement('div');
    this.elements.keysWrapper.classList.add('keyboard__keys');
    this.elements.keysWrapper.appendChild(this.makeKeys(this.props.lang));

    this.elements.keyboard = document.createElement('div');
    this.elements.keyboard.classList.add('keyboard');
    this.elements.keyboard.append(this.elements.keysWrapper);

    wrapper.append(this.elements.keyboard);
  }

  showCapsLockStatus() {
    if (this.props.shift) {
      document.querySelector('.caps').classList.add('key_hold');
    } else {
      document.querySelector('.caps').classList.remove('key_hold');
    }
  }

  makeKeys(language = 'eng') {
    this.fragment = document.createDocumentFragment();

    this.keyLayout[language].forEach((row, arrId) => {
      const currentRow = document.createElement('div');
      currentRow.classList.add('keyboard__row');

      row.forEach((value, index) => {
        const keyElement = document.createElement('button');
        keyElement.classList.add('key');
        keyElement.id = `key${this.keyLayout[language][arrId][index]}`;

        switch (value) {
          case 'Backspace':
            keyElement.innerHTML = '<span class="material-icons md-18">backspace</span>';
            break;

          case 'CapsLock':
            keyElement.classList.add('caps');
            if (this.props.shift) {
              keyElement.classList.add('key_hold');
            }
            keyElement.innerHTML = '<span class="material-icons md-18">keyboard_capslock</span>';
            break;

          case 'Enter':
            keyElement.innerHTML = '<span class="material-icons md-18">keyboard_return</span>';
            break;

          case 'Space':
            keyElement.classList.add('key_space');
            keyElement.innerHTML = '<span class="material-icons md-18">space_bar</span>';
            break;

          case 'Lang':
            keyElement.innerHTML = '<span class="material-icons md-18">language</span>';
            keyElement.classList.add('key_lang');
            break;

          case 'Up':
            keyElement.innerHTML = '<span class="material-icons md-18">keyboard_arrow_up</span>';
            keyElement.classList.add('arrow');
            break;

          case 'Down':
            keyElement.innerHTML = '<span class="material-icons md-18">keyboard_arrow_down</span>';
            keyElement.classList.add('arrow');
            break;

          case 'Left':
            keyElement.innerHTML = '<span class="material-icons md-18">keyboard_arrow_left</span>';
            keyElement.classList.add('arrow');
            break;

          case 'Right':
            keyElement.innerHTML = '<span class="material-icons md-18">keyboard_arrow_right</span>';
            keyElement.classList.add('arrow');
            break;

          default:
            keyElement.classList.add('caps-key');
            keyElement.textContent = this.props.shift ? value.toUpperCase() : value;
            break;
        }
        currentRow.appendChild(keyElement);
      });

      this.fragment.appendChild(currentRow);
    });
    return this.fragment;
  }

  changeLanguage() {
    if (window.localStorage.lang === 'eng') {
      window.localStorage.lang = 'ru';
    } else {
      window.localStorage.lang = 'eng';
    }
    this.renderNewKeyboard(window.localStorage.lang);
  }

  toggleVirtualKeys() {
    this.virtualKeyboardLayout = document.querySelector('.keyboard__keys');
    this.virtualKeyboardLayout.addEventListener('mousedown', event => this.mouseEventHandler(event));
    this.virtualKeyboardLayout.addEventListener('mouseup', event => this.mouseEventHandler(event));

    this.virtualKeyboardLayout.addEventListener('mouseout', (event) => {
      if (event.target.tagName === 'BUTTON') {
        const unpressedKey = document.getElementById(event.fromElement.id);
        if (unpressedKey.classList.contains('key_pressed')) {
          unpressedKey.classList.remove('key_pressed');
        }
      }
    });
  }

  mouseEventHandler(event) {
    const handler = event.type === 'mousedown' ? this.keyboardKeyDown : this.keyboardKeyUp;
    if (event.target.tagName === 'BUTTON') {
      handler.call(this, { code: event.target.id, key: event.target.innerText });
    } else if (event.target.tagName === 'SPAN') {
      handler.call(this, { code: event.target.parentNode.id });
    }
  }

  printToInput(key) {
    const currentCursorPosition = this.getCaretPosition();
    const currentKey = key || '';
    this.elements.input.value = `${this.elements.input.value.slice(0, currentCursorPosition.start)}${currentKey}${this.elements.input.value.slice(currentCursorPosition.end)}`;
    currentCursorPosition.start += 1;
    currentCursorPosition.end = currentCursorPosition.start;
    this.setCaretPosition(currentCursorPosition);
    setTimeout(() => this.elements.input.focus(), 0);
  }

  onBackspaceToggle() {
    const currentCursorPosition = this.getCaretPosition();
    setTimeout(() => this.elements.input.focus(), 0);
    if (currentCursorPosition.end === 0) return;
    if (currentCursorPosition.start === currentCursorPosition.end) {
      this.elements.input.value = `${this.elements.input.value.slice(0, currentCursorPosition.start - 1)}${this.elements.input.value.slice(currentCursorPosition.end)}`;
      currentCursorPosition.start -= 1;
    } else {
      this.elements.input.value = `${this.elements.input.value.slice(0, currentCursorPosition.start)}${this.elements.input.value.slice(currentCursorPosition.end)}`;
    }
    currentCursorPosition.end = currentCursorPosition.start;
    this.setCaretPosition(currentCursorPosition);
  }

  keyboardKeyDown(event) {
    switch (event.code) {
      case 'keyCapsLock':
      case 'keyLang':
        break;

      case 'keyBackspace':
        this.onBackspaceToggle();
        break;

      case 'keyEnter':
        startSearch(null);
        setTimeout(() => this.elements.input.focus(), 0);
        break;

      case 'keySpace':
        this.printToInput(' ');
        break;

      case 'keyRight':
        this.moveCursorRight();
        break;

      case 'keyLeft':
        this.moveCursorLeft();
        break;

      default:
        this.printToInput(event.key);
        break;
    }
    if (event.code !== 'CapsLock') {
      const pressedKey = document.getElementById(`${event.code}`);
      pressedKey.classList.add('key_pressed');
    }
  }

  keyboardKeyUp(event) {
    switch (event.code) {
      case 'keyLang':
        this.changeLanguage();
        break;

      case 'keyCapsLock':
        if (this.props.shift) {
          this.props.shift = false;
          this.renderNewKeyboard(`${window.localStorage.lang}`);
          this.showCapsLockStatus();
        } else {
          this.props.shift = true;
          this.renderNewKeyboard(`${window.localStorage.lang}Shift`);
          this.showCapsLockStatus();
        }
        break;

      default:
        break;
    }
    if (event.code !== 'CapsLock') {
      const unpressedKey = document.getElementById(`${event.code}`);
      unpressedKey.classList.remove('key_pressed');
    }
  }


  moveCursorLeft() {
    const currentCursorPosition = this.getCaretPosition();
    if (currentCursorPosition.start > 0 && currentCursorPosition.end > 0) {
      this.elements.input.selectionStart -= 1;
      this.elements.input.selectionEnd = this.elements.input.selectionStart;
    }
    setTimeout(() => this.elements.input.focus(), 0);
  }

  moveCursorRight() {
    if (this.getCaretPosition().start <= this.elements.input.value.length) {
      this.elements.input.selectionStart += 1;
      this.elements.input.selectionEnd = this.elements.input.selectionStart;
    }
    setTimeout(() => this.elements.input.focus(), 0);
  }


  getCaretPosition() {
    const ctrl = this.elements.input;
    if (document.selection) {
      ctrl.focus();
      const range = document.selection.createRange();
      const rangelen = range.text.length;
      range.moveStart('character', -ctrl.value.length);
      const start = range.text.length - rangelen;
      return {
        start,
        end: start + rangelen,
      };
    }
    if (ctrl.selectionStart || ctrl.selectionStart === '0') {
      return {
        start: ctrl.selectionStart,
        end: ctrl.selectionEnd,
      };
    }
    return {
      start: 0,
      end: 0,
    };
  }


  setCaretPosition(positionObj) {
    const { start, end } = positionObj;
    const ctrl = this.elements.input;
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(start, end);
    } else if (ctrl.createTextRange) {
      const range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
    ctrl.focus();
  }
}

export default VirtualKeyboard;
