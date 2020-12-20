export class FormValidator {
  constructor(form, settings) {
    this._form = form;
    this._settings = settings;
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._submitButton = this._form.querySelector(this._settings.submitButtonSelector);
  }

  _showInputError(inputField, errorMessage) {
    const inputError = this._form.querySelector(`.${inputField.id}${this._settings.errorPostfix}`);
    inputField.classList.add(this._settings.inputValueInvalidClass);
    inputError.classList.add(this._settings.errorActiveClass);
    inputError.textContent = errorMessage;
  }

  _hideInputError(inputField) {
    const inputError = this._form.querySelector(`.${inputField.id}${this._settings.errorPostfix}`);
    inputField.classList.remove(this._settings.inputValueInvalidClass);
    inputError.classList.remove(this._settings.errorActiveClass);
    inputError.textContent = "";
  }

  _isValid(inputField) {
    if (!inputField.validity.valid) {
      this._showInputError(inputField, inputField.validationMessage, this._settings);
    } else {
      this._hideInputError(inputField, this._settings);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputField) => {
      return !inputField.validity.valid;
    });
  }

  _toggleButtonState() {
    this._submitButton.disabled = this._hasInvalidInput();
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputField) => {
      inputField.addEventListener("input", () => {
        this._isValid(inputField, this._settings);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputField) => {
      if (inputField.classList.contains(this._settings.inputValueInvalidClass)) {
        this._hideInputError(inputField);
      }
    });

    if (this._hasInvalidInput()) {
      this._toggleButtonState();
    }
  }
}
