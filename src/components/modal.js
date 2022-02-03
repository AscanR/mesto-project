export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

export function disableButton(button) {
  button.classList.add('popup__button_disabled')
  button.disabled = true
}

export function enableButton(button) {
  button.classList.remove('popup__button_disabled');
  button.disabled = false;
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

