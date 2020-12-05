export function handlePopupOverlayMousedown(evt) {
  const eventTarget = evt.target;
  if (eventTarget.classList.contains("popup")) {
    closePopup(eventTarget);
  }
}

export function handleEscapeKeydown(evt) {
  const popupOpened = document.querySelector(".popup_opened");
  if (popupOpened && evt.key === "Escape") {
    closePopup(popupOpened);
  }
}

export function openPopup(popup) {
  popup.addEventListener("mousedown", handlePopupOverlayMousedown);
  document.addEventListener("keydown", handleEscapeKeydown);
  popup.classList.add("popup_opened");
}

export function closePopup(popup) {
  popup.removeEventListener("mousedown", handlePopupOverlayMousedown);
  document.removeEventListener("keydown", handleEscapeKeydown);
  popup.classList.remove("popup_opened");
}