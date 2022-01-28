const profileNameElement = document.querySelector('.profile__name');
const profilePositionElement = document.querySelector('.profile__position');
const nameInput = document.querySelector('#name');
const profInput = document.querySelector('#profile');

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

export function disableButton(popup) {
  popup.querySelector('.popup__button').classList.add('popup__button_disabled');
  popup.querySelector('.popup__button').disabled = true;
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {                                             //Спасибо большое за функцию!
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

export function handleProfileFormSubmit(evt) {
  evt.preventDefault()
  profileNameElement.textContent = nameInput.value
  profilePositionElement.textContent = profInput.value
}