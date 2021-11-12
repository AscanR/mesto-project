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

function cardPlacer () {
  for (let i = 0; i < initialCards.length; i++) {
  const arr = initialCards[i]
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  cardElement.querySelector('.card__photo').src = arr.link
  cardElement.querySelector('.card__text').textContent = arr.name
  cardElement.querySelector('.card__photo').alt = arr.name
  cardContainer.prepend(cardElement)}}
cardPlacer ()

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButtonProfile.addEventListener('click', () => closePopup(popupProfile))

editButton.addEventListener('click', () => openPopup(popupProfile))

function formSubmitHandler (evt) {
  evt.preventDefault()
  document.querySelector('.profile__name').textContent = nameInput.value
  document.querySelector('.profile__position').textContent = profInput.value
}

formElement.addEventListener('submit', formSubmitHandler)

saveButton.addEventListener('click', () => closePopup (popupProfile))

closeButtonPlace.addEventListener('click', () => closePopup (popupPlace))

addButton.addEventListener('click', () => {
  sourcePlaceInput.value = ''
  namePlaceInput.value = ''
  openPopup(popupPlace)
})

function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true) 
  cardElement.querySelector('.card__photo').src = cardData.link
  cardElement.querySelector('.card__text').textContent = cardData.name
  cardElement.querySelector('.card__photo').alt = cardData.name
  return cardElement;
}

formElementPlace.addEventListener('submit', (evt) => {
  evt.preventDefault()
  const cardData = {
    name: namePlaceInput.value,
    link: sourcePlaceInput.value
  }

  const newCard = createCard(cardData)
  cardContainer.prepend(newCard)

  const deleteButton = document.querySelectorAll('.card__trash').forEach((a) => {
    a.addEventListener('click', (e) => {
    const item = e.target.closest('.card')
    item.remove()}) 
  })
  
  document.querySelector('.card__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__heart_active')})

  const loopButton = document.querySelectorAll('.card__photo').forEach((el) => {
    el.addEventListener('click', (obj) => {
    popupImage.classList.add('popup_opened')
    popupImage.querySelector('.popup__photo').src = obj.target.closest('.card__photo').src
    popupImage.querySelector('.popup__caption').textContent = obj.target.closest('.card').textContent})
  })
})

createButton.addEventListener('click', () => closePopup (popupPlace))

const deleteButton = document.querySelectorAll('.card__trash').forEach((a) => {
    a.addEventListener('click', (e) => {
    const item = e.target.closest('.card')
    item.remove()}) 
  })

  const heartActive = document.querySelectorAll('.card__heart').forEach((b) => {
    b.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__heart_active')})
  })
  
  closeButtonLoop.addEventListener('click', () => closePopup (popupImage))

  const loopButton = document.querySelectorAll('.card__photo').forEach((el) => {
    el.addEventListener('click', (obj) => {
    openPopup(popupImage)
    popupImage.querySelector('.popup__photo').src = obj.target.closest('.card__photo').src
    popupImage.querySelector('.popup__caption').textContent = obj.target.closest('.card').textContent})
  })
