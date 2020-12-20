import { popupImage, popupImageCaption } from "./data.js";

export class Card {
  constructor(data, templateSelector, popup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._popup = popup;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.cloneNode(true);
  }

  _setEventListeners() {
    this._handleImageClick();
    this._handleLikeButton();
    this._handleDeleteButton();
  }

  _handleImageClick() {
    this._cardImage.addEventListener("click", (evt) => {
      const eventTarget = evt.target;
      popupImage.setAttribute("src", eventTarget.getAttribute("src"));
      popupImage.setAttribute("alt", eventTarget.getAttribute("alt"));
      popupImageCaption.textContent = this._name;
      this._popup.open();
    });
  }

  _handleLikeButton() {
    this._cardLikeButton.addEventListener("click", (evt) => {
      const eventTarget = evt.target;
      eventTarget.classList.toggle("card__like-button_active");
    });
  }

  _handleDeleteButton() {
    this._cardDeleteButton.addEventListener("click", (evt) => {
      const eventTarget = evt.target;
      eventTarget.closest(".card").remove();
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardLikeButton = this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(".card__delete-button");

    this._setEventListeners();
    this._cardTitle.textContent = this._name;
    this._cardImage.setAttribute("src", this._link);
    this._cardImage.setAttribute("alt", this._name);

    return this._cardElement;
  }
}
