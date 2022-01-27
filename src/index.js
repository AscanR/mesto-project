import './index.css';
import {enableValidation, validationConfig} from "./components/validate";
import {createCard, cardPlacer, cardContainer, popupImage} from "./components/card";
import {openPopup, closePopup, buttonDisabling, formSubmitHandler} from "./components/modal";


export const popupImagePhoto = popupImage.querySelector('.popup__photo');
export const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupProfile = document.querySelector('#popup-profile');
const popupPlace = document.querySelector('#popup-place');
const closeButtonProfile = document.querySelector('#close-profile');
const closeButtonPlace = document.querySelector('#close-place');
const closeButtonLoop = document.querySelector('#close-img');
const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const saveButton = document.querySelector('#save-button');
const createButton = document.querySelector('#create-button');
const nameInput = document.querySelector('#name');
const profInput = document.querySelector('#profile');
const formElement = document.querySelector('#edit-profile');
const formElementPlace = document.querySelector('#add-place');
const namePlaceInput = document.querySelector('#name-place');
const sourcePlaceInput = document.querySelector('#place-source');
const profileNameElement = document.querySelector('.profile__name');
const profilePositionElement = document.querySelector('.profile__position');

editButton.addEventListener('click', () => {
  openPopup(popupProfile)
  buttonDisabling(popupProfile)
});

closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));

formElement.addEventListener('submit', formSubmitHandler);

saveButton.addEventListener('click', () => closePopup(popupProfile));

closeButtonPlace.addEventListener('click', () => closePopup(popupPlace));

addButton.addEventListener('click', () => {
  sourcePlaceInput.value = ''
  namePlaceInput.value = ''
  openPopup(popupPlace)
  buttonDisabling(popupPlace)
});

createButton.addEventListener('click', () => closePopup(popupPlace));

closeButtonLoop.addEventListener('click', () => closePopup(popupImage));


window.onkeydown = (event) => {
  if (event.keyCode === 27) {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened)
  }
};

window.addEventListener('click', (e) => {
  if (e.target.closest('.popup_opened') && !e.target.closest('.popup__container')) {
    closePopup(e.target.closest('.popup'))
  }
});


formElementPlace.addEventListener('submit', (evt) => {
  evt.preventDefault()
  const cardData = {
    name: namePlaceInput.value,
    link: sourcePlaceInput.value
  }
  const newCard = createCard(cardData)
  cardContainer.prepend(newCard)
});

cardPlacer();
enableValidation(validationConfig);