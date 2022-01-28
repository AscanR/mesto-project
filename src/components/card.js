import {openPopup} from "./modal";
import {popupImagePhoto, popupImageCaption} from "./index";

export const cardContainer = document.querySelector('.cards-grid');
export const popupImage = document.querySelector('#popup-img');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  const cardPhoto = cardElement.querySelector('.card__photo')
  cardPhoto.src = cardData.link
  cardElement.querySelector('.card__text').textContent = cardData.name
  cardPhoto.alt = cardData.name
  cardElement.querySelector('.card__trash').addEventListener('click', (evt) => evt.target.closest('.card').remove())
  cardElement.querySelector('.card__heart').addEventListener('click', (evt) => evt.target.classList.toggle('card__heart_active'))
  cardPhoto.addEventListener('click', () => {
    popupImageCaption.textContent = cardData.name
    popupImagePhoto.src = cardData.link
    popupImagePhoto.alt = cardData.name
    openPopup(popupImage)
  })
  return cardElement
}

export function renderCards() {
  for (let i = 0; i < initialCards.length; i++) {
    const cardData = initialCards[i]
    const newCard = createCard(cardData)
    cardContainer.prepend(newCard)
  }
}



