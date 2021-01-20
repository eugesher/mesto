export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") this.close();
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains(this._selector.replace(".", ""))) this.close();
    });
  }

  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.classList.add("popup_opened");
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.classList.remove("popup_opened");
  }
}
