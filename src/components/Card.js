export class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
    this._cardLikeButton = this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(".card__delete-button");
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.cloneNode(true);
  }

  _setEventListeners() {
    this._handleImageClick();
    this._handleLikeButton();
    this._handleDeleteButton();
  }

  _likeCard() {
    this._cardLikeButton.classList.toggle("card__like-button_active");
  }

  _deleteCard() {
    this._cardDeleteButton.closest(".card").remove();
  }

  _handleImageClick() {
    this._cardImage.addEventListener("click", (evt) => {
      this._handleCardClick(evt);
    });
  }

  _handleLikeButton() {
    this._cardLikeButton.addEventListener("click", () => {
      this._likeCard();
    });
  }

  _handleDeleteButton() {
    this._cardDeleteButton.addEventListener("click", () => {
      this._deleteCard();
    });
  }

  generateCard() {
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");

    this._setEventListeners();
    this._cardTitle.textContent = this._name;
    this._cardImage.setAttribute("src", this._link);
    this._cardImage.setAttribute("alt", this._name);

    return this._cardElement;
  }
}
