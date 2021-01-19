export class Card {
  constructor({  _id, name, link, likes, owner  }, templateSelector, userId, { handleCardClick, handleDeleteButton }) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._ownerId = owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
    this._card = this._cardElement.querySelector(".card")
    this._cardLikeButton = this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(".card__delete-button");
    // todo: rename fields
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.cloneNode(true);
  }

  _setEventListeners() {
    this._handleImageClick();
    this._handleLikeButton();
    this._handleDeleteButtonAction();
  }

  _likeCard() {
    this._cardLikeButton.classList.toggle("card__like-button_active");
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
  
  _handleDeleteButtonAction() {
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteButton(this._id);
    });
  }
  
  _getLikeCount() {
    return this._likes.length;
  }
  
  remove() {
    console.log(this._cardElement);
    this._card.remove();
  }

  generateCard() {
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardLikeCounter = this._cardElement.querySelector(".card__like-count");

    this._setEventListeners();
    this._cardTitle.textContent = this._name;
    this._cardImage.setAttribute("src", this._link);
    this._cardImage.setAttribute("alt", this._name);
    this._cardLikeCounter.textContent = this._getLikeCount();
    this._cardDeleteButton.disabled = this._ownerId !== this._userId;

    return this._cardElement;
  }
}
