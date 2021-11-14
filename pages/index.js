const popupProfile = document.querySelector('#popup-profile')
const popupPlace = document.querySelector('#popup-place')
const popupImage = document.querySelector('#popup-img')
const closeButtonProfile = document.querySelector('#close-profile')
const closeButtonPlace = document.querySelector('#close-place')
const closeButtonLoop = document.querySelector('#close-img')
const editButton = document.querySelector('.profile__edit')
const addButton = document.querySelector('.profile__add')
const saveButton = document.querySelector('#save-button')
const createButton = document.querySelector('#create-button')
const nameInput = document.querySelector('#name')
const profInput = document.querySelector('#profile')
const formElement = document.querySelector('#edit-profile')
const formElementPlace = document.querySelector('#add-place')
const namePlaceInput = document.querySelector('#name-place')
const sourcePlaceInput = document.querySelector('#place-source')
const cardContainer = document.querySelector('.cards-grid')
const popupImagePhoto = popupImage.querySelector('.popup__photo')
const popupImageCaption = popupImage.querySelector('.popup__caption')
const profileNameElement = document.querySelector('.profile__name')
const profilePositionElement = document.querySelector('.profile__position')
const initialCards = [
  {name: 'Архыз',
   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
  {name: 'Челябинская область',
   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
  {name: 'Иваново',
   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  {name: 'Камчатка',
   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
  {name: 'Холмогорский район',
   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
  {name: 'Байкал',
   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
]

function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true) 
  const cardPhotoData = cardElement.querySelector('.card__photo')
  cardPhotoData.src = cardData.link
  cardElement.querySelector('.card__text').textContent = cardData.name
  cardPhotoData.alt = cardData.name
  cardElement.querySelector('.card__trash').addEventListener('click', (evt) =>  evt.target.closest('.card').remove())
  cardElement.querySelector('.card__heart').addEventListener('click', (evt) =>  evt.target.classList.toggle('card__heart_active'))
  cardElement.querySelector('.card__photo').addEventListener('click', () => {
    popupImageCaption.textContent = cardData.name
    popupImagePhoto.src = cardData.link
    popupImagePhoto.alt = cardData.name
    openPopup(popupImage)
  })
  return cardElement
}

function cardPlacer () {
  for (let i = 0; i < initialCards.length; i++) {
  const arr = initialCards[i]
  const newCard = createCard(arr)
  cardContainer.prepend(newCard)
  }
}

cardPlacer ()

function openPopup(popup) {
  popup.classList.add('popup_opened')
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

function formSubmitHandler (evt) {
  evt.preventDefault()
  profileNameElement.textContent = nameInput.value
  profilePositionElement.textContent = profInput.value
}

closeButtonProfile.addEventListener('click', () => closePopup(popupProfile))

editButton.addEventListener('click', () => openPopup(popupProfile))

formElement.addEventListener('submit', formSubmitHandler)

saveButton.addEventListener('click', () => closePopup (popupProfile))

closeButtonPlace.addEventListener('click', () => closePopup (popupPlace))

addButton.addEventListener('click', () => {
  sourcePlaceInput.value = ''
  namePlaceInput.value = ''
  openPopup(popupPlace)
})

formElementPlace.addEventListener('submit', (evt) => {
  evt.preventDefault()
  const cardData = {
    name: namePlaceInput.value,
    link: sourcePlaceInput.value
  }
  const newCard = createCard(cardData)
  cardContainer.prepend(newCard)
})

createButton.addEventListener('click', () => closePopup (popupPlace))

closeButtonLoop.addEventListener('click', () => closePopup (popupImage))
