import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__content");
    this._submitButton = this._popup.querySelector(".popup__submit-button");
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
      console.log(this._formValues)
    });
    return this._formValues;
  }

  _clearValues() {
    this._inputList.forEach((input) => {
      input.value = "";
    });
  }
  
  setButtonText(value) {
    this._submitButton.textContent = value;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._close();
    });
  }

  _close() {
    super._close();
    this._clearValues();
  }
}
