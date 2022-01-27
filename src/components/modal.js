export function openPopup(popup) {
  popup.classList.add('popup_opened');
}

export function buttonDisabling(popup) {
  popup.querySelector('.popup__button').classList.add('popup__button_disabled');
  popup.querySelector('.popup__button').disabled = true;
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

export function formSubmitHandler(evt) {
  evt.preventDefault()
  profileNameElement.textContent = nameInput.value
  profilePositionElement.textContent = profInput.value
}