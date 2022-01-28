import '../index.css';
import {enableValidation, validationConfig} from "./validate";
import {createCard, renderCards, cardContainer, popupImage} from "./card";
import {openPopup, closePopup, disableButton, handleProfileFormSubmit} from "./modal";

export const popupImagePhoto = popupImage.querySelector('.popup__photo');
export const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupProfile = document.querySelector('#popup-profile');
const popupPlace = document.querySelector('#popup-place');
const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const saveButton = document.querySelector('#save-button');
const createButton = document.querySelector('#create-button');
const profileForm = document.querySelector('#edit-profile');
const profileFormPlace = document.querySelector('#add-place');
const namePlaceInput = document.querySelector('#name-place');
const sourcePlaceInput = document.querySelector('#place-source');

profileFormPlace.addEventListener('submit', (evt) => {
  evt.preventDefault()
  const cardData = {
    name: namePlaceInput.value,
    link: sourcePlaceInput.value
  }
  const newCard = createCard(cardData)
  cardContainer.prepend(newCard)
});

editButton.addEventListener('click', () => {
  openPopup(popupProfile)
  disableButton(popupProfile)
});

profileForm.addEventListener('submit', handleProfileFormSubmit);

saveButton.addEventListener('click', () => closePopup(popupProfile));

addButton.addEventListener('click', () => {
  sourcePlaceInput.value = ''
  namePlaceInput.value = ''
  openPopup(popupPlace)
  disableButton(popupPlace)
});

createButton.addEventListener('click', () => closePopup(popupPlace));

const popups = document.querySelectorAll('.popup')           //Спасибо большое за функцию!
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

renderCards();
enableValidation(validationConfig);