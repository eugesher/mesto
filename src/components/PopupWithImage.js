import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(imageName, imageLink) {
    super.open();
    this._image = this._popup.querySelector(".popup__image");
    this._imageCaption = this._popup.querySelector(".popup__image-caption");
    this._image.setAttribute("src", imageLink);
    this._image.setAttribute("alt", imageName);
    this._imageCaption.textContent = imageName;
  }
}
