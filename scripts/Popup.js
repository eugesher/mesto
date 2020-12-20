export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") this.close();
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains("popup")) this.close();
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    this._popup.addEventListener("mousedown", this._handleOverlayClose.bind(this));
  }

  reset() {
    this._closeButton.removeEventListener("click", () => this.close());
    this._popup.removeEventListener("mousedown", this._handleOverlayClose.bind(this));
  }

  open() {
    this.setEventListeners();
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    this._popup.classList.add("popup_opened");
    console.log(this._closeButton);
  }

  close() {
    this.reset();
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
    this._popup.classList.remove("popup_opened");
  }
}
