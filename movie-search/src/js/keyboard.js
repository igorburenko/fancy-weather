class VirtualKeyboard {
  constructor() {
    this.elements = {};

    this.virtualKeyboardLayout = '';

    this.props = {
      textValue: '',
      capsLock: false,
      shift: false,
      controlPress: false,
      altPress: false,
    };

    this.keyLayout = {
      eng: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
        'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'ru',
        'ctrl', 'alt', 'win', 'Space', 'alt', '←', '↓', '→',
      ],

      engShift: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|',
        'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'Enter',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', '↑', 'ru',
        'ctrl', 'alt', 'win', 'Space', 'alt', '←', '↓', '→',
      ],

      ru: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ё',
        'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
        'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', '↑', 'eng',
        'ctrl', 'alt', 'win', 'Space', 'alt', '←', '↓', '→',
      ],

      ruShift: ['[', '!', '"', '№', '%', ':', ',', '.', '*', '(', ')', '_', '+', 'Backspace',
        'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ё',
        'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
        'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '?', '↑', 'eng',
        'ctrl', 'alt', 'win', 'Space', 'alt', '←', '↓', '→',
      ],

      eventCode: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
        'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
        'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
        'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'lang',
        'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
      ],
    };
  }

  init() {
    this.elements.wrapper = document.createElement('div');
    this.elements.wrapper.classList.add('wrapper');

    this.elements.inputWindow = document.createElement('div');
    this.elements.inputWindow.classList.add('input-window');
    this.elements.inputArea = document.createElement('textarea');
    this.elements.inputArea.setAttribute('disabled', 'disabled');

    this.elements.inputArea.classList.add('input-area');
    this.elements.inputArea.value = this.props.textValue;
    this.elements.inputWindow.append(this.elements.inputArea);

    this.elements.keysWrapper = document.createElement('div');
    this.elements.keysWrapper.classList.add('keyboard__keys');
    this.lang = window.localStorage.lang || 'eng';
    this.elements.keysWrapper.appendChild(this.makeKeys(this.lang));

    this.elements.keyboard = document.createElement('div');
    this.elements.keyboard.classList.add('keyboard');
    this.elements.keyboard.append(this.elements.keysWrapper);

    this.elements.help = document.createElement('div');
    this.elements.help.classList.add('help');
    this.elements.helpText = document.createElement('p');
    this.elements.helpText.innerText = ('Для переключения между раскладками используйте (windows) => ctrl+alt, (mac os) => '
      + 'ctrl+option. \n Клавиатура создавалась в MAC OS, могут быть различия в нажатиях на кнопки клавиатуры для других операционных систем.\n'
      + 'Если у вас что-то не работает, свяжитесь со мной в Discord - Ihor Burenko#8136 или телеграмм - @Burenko');
    this.elements.help.append(this.elements.helpText);

    this.elements.buttonHide = document.createElement('button');
    this.elements.buttonHide.classList.add('key', 'button-hide');
    this.elements.buttonHide.innerText = 'Спрятать информацию';
    this.elements.help.append(this.elements.buttonHide);

    this.elements.wrapper.append(this.elements.inputWindow);
    this.elements.wrapper.append(this.elements.keyboard);
    this.elements.wrapper.append(this.elements.help);

    document.body.append(this.elements.wrapper);

    this.virtualKeyboardLayout = document.querySelector('.keyboard__keys');
  }

  printToWindow() {
    document.querySelector('.input-area').value = this.props.textValue;
  }

  toggleCapsLock() {
    this.props.capsLock = !this.props.capsLock;
    this.showCapsLockActive();
    this.toggleCharUpDown();
  }

  showCapsLockActive() {
    if (this.props.capsLock) {
      document.querySelector('.caps').classList.add('key_hold');
    } else {
      document.querySelector('.caps').classList.remove('key_hold');
    }
  }

  toggleCharUpDown() {
    this.elements.keys = document.querySelectorAll('.caps-key');
    this.elements.keys.forEach((val, index) => {
      if (val.textContent.length === 1) {
        this.elements.keys[index].textContent = this.props.capsLock ? val.textContent.toUpperCase()
          : val.textContent.toLowerCase();
      }
    });
  }

  makeKeys(language = 'eng') {
    this.fragment = document.createDocumentFragment();
    this.keyLayout[language].forEach((value, index) => {
      const keyElement = document.createElement('button');
      const addBrTag = ['Backspace', '\\', 'Enter', 'eng', 'ru', 'ё', '|'].indexOf(value) !== -1;
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('key');
      keyElement.id = this.keyLayout.eventCode[index];

      switch (value) {
        case 'Backspace':
          keyElement.classList.add('key_wide');
          break;

        case 'CapsLock':
          keyElement.classList.add('key_wide', 'caps');
          if (this.props.capsLock) {
            keyElement.classList.add('key_hold');
          }
          break;

        case 'Enter':
          keyElement.classList.add('key_wide');
          break;

        case 'Shift':
          keyElement.classList.add('key_shift-wide');
          break;
        case 'Tab':
          keyElement.classList.add('key_middle-wide');
          break;

        case 'Space':
          keyElement.classList.add('key_space');
          break;

        case 'ctrl':
        case 'alt':
        case 'win':
          keyElement.classList.add('key_ctrl');
          break;

        case 'ru':
        case 'eng':
          keyElement.classList.add('key_lang');
          break;

        default:
          keyElement.classList.add('caps-key');
          break;
      }
      keyElement.textContent = (this.props.shift && value.length === 1)
      || (this.props.capsLock && keyElement.classList.contains('caps-key'))
        ? value.toUpperCase() : value;
      this.fragment.appendChild(keyElement);
      if (addBrTag) {
        this.fragment.appendChild(document.createElement('br'));
      }
    });
    return this.fragment;
  }

  renderNewKeyboard(language) {
    this.elements.newKeysWrapper = document.createElement('div');
    this.elements.newKeysWrapper.classList.add('keyboard__keys');
    this.elements.newKeysWrapper.appendChild(this.makeKeys(language));
    this.elements.oldKeyboard = document.querySelector('.keyboard__keys');
    this.elements.oldKeyboard.replaceWith(this.elements.newKeysWrapper);
    this.toggleVirtualKeys();
  }

  changeLanguage() {
    if (window.localStorage.lang === 'eng') {
      window.localStorage.lang = 'ru';
    } else {
      window.localStorage.lang = 'eng';
    }
    this.renderNewKeyboard(window.localStorage.lang);
  }

  checkLangChangeFromHardware() {
    if (this.props.controlPress && this.props.altPress) {
      this.changeLanguage();
    }
  }

  toggleHardwareKeys() {
    document.addEventListener('keydown', (event) => {
      if (this.keyLayout.eventCode.includes(event.code)) {
        this.keyboardKeyDown(event);
      }
    });
    document.addEventListener('keyup', (event) => {
      if (this.keyLayout.eventCode.includes(event.code)) {
        this.keyboardKeyUp(event);
      }
    });
  }

  toggleVirtualKeys() {
    this.virtualKeyboardLayout = document.querySelector('.keyboard__keys');
    this.virtualKeyboardLayout.addEventListener('mousedown', (event) => {
      if (event.target.tagName === 'BUTTON') {
        this.keyboardKeyDown({ code: event.target.id, key: event.target.innerText, virtual: true });
      }
    });
    this.virtualKeyboardLayout.addEventListener('mouseup', (event) => {
      if (event.target.tagName === 'BUTTON') {
        this.keyboardKeyUp({ code: event.target.id, key: event.target.innerText, virtual: true });
      }
    });
    this.virtualKeyboardLayout.addEventListener('mouseout', (event) => {
      if (event.target.tagName === 'BUTTON') {
        const unpressedKey = document.querySelector(`#${event.fromElement.id}`);
        if (unpressedKey.classList.contains('key_pressed')) {
          unpressedKey.classList.remove('key_pressed');
        }
      }
    });
  }

  keyboardKeyDown(event) {
    switch (event.code) {
      case 'Backspace':
        this.props.textValue = this.props.textValue
          .substring(0, this.props.textValue.length - 1);
        this.printToWindow();
        break;

      case 'CapsLock':
        if (!this.props.capsLock || (event.virtual && this.props.capsLock)) {
          this.toggleCapsLock();
        }
        break;

      case 'Enter':
        this.props.textValue += '\n';
        this.toggleCharUpDown();
        break;

      case 'ShiftLeft':
        this.props.shift = true;
        this.renderNewKeyboard(`${window.localStorage.lang}Shift`);
        break;

      case 'Tab':
        this.props.textValue += '   ';
        this.printToWindow();
        break;

      case 'Space':
        this.props.textValue += ' ';
        this.printToWindow();
        break;

      case 'ControlLeft':
        this.props.controlPress = true;
        break;

      case 'AltLeft':
      case 'AltRight':
        this.props.altPress = true;
        break;

      case 'lang':
        this.changeLanguage();
        break;

      case 'MetaLeft':
        break;

      case 'ArrowRight':
        if (!event.virtual) {
          event.preventDefault();
        }
        this.props.textValue += '→';
        this.printToWindow();
        break;

      case 'ArrowLeft':
        if (!event.virtual) {
          event.preventDefault();
        }
        this.props.textValue += '←';
        this.printToWindow();
        break;

      case 'ArrowDown':
        if (!event.virtual) {
          event.preventDefault();
        }
        this.props.textValue += '↓';
        this.printToWindow();
        break;

      case 'ArrowUp':
        if (!event.virtual) {
          event.preventDefault();
        }
        this.props.textValue += '↑';
        this.printToWindow();
        break;

      default:
        this.props.textValue += this.props.capsLock ? event.key.toUpperCase() : event.key;
        this.printToWindow();
        break;
    }
    if (event.code !== 'CapsLock') {
      this.pressedKey = document.querySelector(`#${event.code}`);
      this.pressedKey.classList.add('key_pressed');
    }
  }

  keyboardKeyUp(event) {
    switch (event.code) {
      case 'CapsLock':
        if (this.props.shift) {
          this.props.capsLock = false;
          this.showCapsLockActive();
        } else if (!event.virtual) {
          this.toggleCapsLock();
        }
        break;

      case 'ShiftLeft':
        this.props.shift = false;
        this.renderNewKeyboard(window.localStorage.lang);
        break;

      case 'ControlLeft':
        this.checkLangChangeFromHardware();
        this.props.controlPress = false;
        break;

      case 'AltLeft':
        this.checkLangChangeFromHardware();
        this.props.altPress = false;
        break;

      case 'MetaLeft':
        break;

      default:
        break;
    }
    if (event.code !== 'CapsLock') {
      this.unpressedKey = document.querySelector(`#${event.code}`);
      this.unpressedKey.classList.remove('key_pressed');
    }
  }

  hideHelpInfoEvent() {
    this.hideBtn = document.querySelector('.button-hide');
    this.hideBtn.addEventListener('click', () => {
      document.querySelector('.help').style.display = 'none';
    });
  }
}

window.onload = function () {
  window.localStorage.lang = 'eng';
  const keyboard = new VirtualKeyboard();
  keyboard.init();
  keyboard.toggleHardwareKeys();
  keyboard.toggleVirtualKeys();
  keyboard.hideHelpInfoEvent();
};

export default VirtualKeyboard;
