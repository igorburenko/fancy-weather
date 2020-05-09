
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
        ['Lang', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
        ['Space'],
      ],

      engShift: [['!', '@', '#', '$', '%', '&', '*', '(', ')', '_', 'Backspace'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '"'],
        ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Enter'],
        ['Lang', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?'],
        ['+', '-', 'Space', '*', '='],
      ],

      ru: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'],
        ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
        ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'Enter'],
        ['Lang', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'э'],
        ['CapsLock', '/', 'Space', 'ё', 'ъ'],
      ],

      ruShift: [['!', '"', '%', ':', ',', '.', '*', '(', ')', '_', 'Backspace'],
        ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
        ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'Enter'],
        ['Lang', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'э'],
        ['CapsLock', '/', 'Space', 'ё', 'ъ'],
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
    this.virtualKeyboardLayout.addEventListener('mousedown', (event) => {
      if (event.target.tagName === 'BUTTON') {
        this.keyboardKeyDown({ code: event.target.id, key: event.target.innerText });
      } else if (event.target.tagName === 'SPAN') {
        this.keyboardKeyDown({ code: event.target.parentNode.id });
      }
    });
    this.virtualKeyboardLayout.addEventListener('mouseup', (event) => {
      if (event.target.tagName === 'BUTTON') {
        this.keyboardKeyUp({ code: event.target.id, key: event.target.innerText });
      } else if (event.target.tagName === 'SPAN') {
        this.keyboardKeyUp({ code: event.target.parentNode.id });
      }
    });
    this.virtualKeyboardLayout.addEventListener('mouseout', (event) => {
      if (event.target.tagName === 'BUTTON') {
        const unpressedKey = document.getElementById(event.fromElement.id);
        if (unpressedKey.classList.contains('key_pressed')) {
          unpressedKey.classList.remove('key_pressed');
        }
      }
    });
  }

  printToInput(key) {
    this.elements.input.value = this.elements.input.value + key;
    setTimeout(() => this.elements.input.focus(), 0);
  }

  keyboardKeyDown(event) {
    switch (event.code) {
      case 'keyBackspace':
        this.elements.input.value = this.elements.input.value
          .substring(0, this.elements.input.value.length - 1);
        setTimeout(() => this.elements.input.focus(), 0);
        break;

      case 'keyEnter':
        startSearch(null);
        setTimeout(() => this.elements.input.focus(), 0);
        break;

      case 'keySpace':
        this.printToInput(' ');
        break;

      case 'keyLang':
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
}

export default VirtualKeyboard;
