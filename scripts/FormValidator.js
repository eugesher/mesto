export class FormValidator {
  constructor(form, settings) {
    this._form = form;
    this._settings = settings;
  }

  _showInputError(inputField, errorMessage) {
    const inputError = this._form.querySelector(
      `.${inputField.id}${this._settings.errorSuffix}`
    );
    inputField.classList.add(this._settings.inputValueInvalidClass);
    inputError.classList.add(this._settings.errorActiveClass);
    inputError.textContent = errorMessage;
  }

  _hideInputError(inputField) {
    const inputError = this._form.querySelector(
      `.${inputField.id}${this._settings.errorSuffix}`
    );
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

  _hasInvalidInput(inputList) {
    return inputList.some((inputField) => {
      return !inputField.validity.valid;
    });
  }

  _toggleButtonState(inputList, submitButton) {
    submitButton.disabled = this._hasInvalidInput(inputList);
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    const submitButton = this._form.querySelector(this._settings.submitButtonSelector);

    this._toggleButtonState(inputList, submitButton);

    inputList.forEach((inputField) => {
      inputField.addEventListener("input", () => {
        this._isValid(inputField, this._settings);
        this._toggleButtonState(inputList, submitButton);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    const submitButton = this._form.querySelector(this._settings.submitButtonSelector);

    inputList.forEach((inputField) => {
      if (inputField.classList.contains(this._settings.inputValueInvalidClass)) {
        this._hideInputError(this._form, inputField);
      }
    });

    if (this._hasInvalidInput(inputList)) {
      this._toggleButtonState(inputList, submitButton);
    }
  }
}