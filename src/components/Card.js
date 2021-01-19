export class Card {
  constructor({ _id, name, link, likes, owner }, templateSelector, userId, { handleCardClick, handleDeleteButton }) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._ownerId = owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._templateSelector = templateSelector;
    this._template = this._getTemplate();
    this._element = this._template.querySelector(".card");
    this._likeButton = this._template.querySelector(".card__like-button");
    this._deleteButton = this._template.querySelector(".card__delete-button");
    // todo: rename fields
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.cloneNode(true);
  }

  _setEventListeners() {
    this._handleCardClickAction();
    this._handleLikeButtonAction();
    this._handleDeleteButtonAction();
  }

  _likeCard() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleCardClickAction() {
    this._cardImage.addEventListener("click", (evt) => {
      this._handleCardClick(evt);
    });
  }

  _handleLikeButtonAction() {
    this._likeButton.addEventListener("click", () => {
      this._likeCard();
    });
  }

  _handleDeleteButtonAction() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton(this._id);
    });
  }

  _getLikeCount() {
    return this._likes.length;
  }

  remove() {
    this._element.remove();
  }

  generateCard() {
    this._cardTitle = this._template.querySelector(".card__title");
    this._cardImage = this._template.querySelector(".card__image");
    this._cardLikeCounter = this._template.querySelector(".card__like-count");

    this._setEventListeners();
    this._cardTitle.textContent = this._name;
    this._cardImage.setAttribute("src", this._link);
    this._cardImage.setAttribute("alt", this._name);
    this._cardLikeCounter.textContent = this._getLikeCount();
    this._deleteButton.disabled = this._ownerId !== this._userId;

    return this._template;
  }
}
