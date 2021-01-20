export default class Card {
  constructor({ _id, name, link, likes, owner }, templateSelector, userId, { handleCardClick, handleDeleteButton, handleLikeButton }) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._ownerId = owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeButton = handleLikeButton;
    this._templateSelector = templateSelector;
    this._template = this._getTemplate();
    this._element = this._template.querySelector(".card");
    this._deleteButton = this._template.querySelector(".card__delete-button");
    this._likeButton = this._template.querySelector(".card__like-button");
    this._likeCounter = this._template.querySelector(".card__like-count");
    this._liked = this._isLiked();
  }
  
  _getTemplate() {
    return document.querySelector(this._templateSelector).content.cloneNode(true);
  }
  
  _getLikeCount() {
    return this._likes.length;
  }
  
  _isLiked() {
    let isLiked = false
    this._likes.forEach((likeData) => {
      if (likeData._id === this._userId) {
        isLiked = true;
      }
    })
    return isLiked;
  }
  
  _handleCardClickAction() {
    this._cardImage.addEventListener("click", (evt) => {
      this._handleCardClick(evt);
    });
  }
  
  _handleDeleteButtonAction() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton(this._id);
    });
  }
  
  _handleLikeButtonAction() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton(this._id, this._liked);
    });
  }
  
  _setEventListeners() {
    this._handleCardClickAction();
    this._handleLikeButtonAction();
    this._handleDeleteButtonAction();
  }
  
  remove() {
    this._element.remove();
  }
  
  like(likeCountData) {
    this._likeButton.classList.add("card__like-button_active");
    this._likeCounter.textContent = likeCountData;
    this._liked = true;
  }
  
  removeLike(likeCountData) {
    this._likeButton.classList.remove("card__like-button_active");
    this._likeCounter.textContent = likeCountData;
    this._liked = false;
  }
  
  generate() {
    this._cardTitle = this._template.querySelector(".card__title");
    this._cardImage = this._template.querySelector(".card__image");

    this._setEventListeners();
    this._cardTitle.textContent = this._name;
    this._cardImage.setAttribute("src", this._link);
    this._cardImage.setAttribute("alt", this._name);
    this._likeCounter.textContent = this._getLikeCount();
    this._deleteButton.disabled = this._ownerId !== this._userId;
    if (this._liked) this._likeButton.classList.add("card__like-button_active");

    return this._template;
  }
}
