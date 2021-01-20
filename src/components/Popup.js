export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") this._close();
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this._close());
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains(this._selector.replace(".", ""))) this._close();
    });
  }

  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.classList.add("popup_opened");
  }
}
