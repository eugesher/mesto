import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(imageName, imageLink) {
    super.open();
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupImageCaption = this._popup.querySelector(".popup__image-caption");
    this._popupImage.setAttribute("src", imageLink);
    this._popupImage.setAttribute("alt", imageName);
    this._popupImageCaption.textContent = imageName;
  }
}
