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
  let arr = initialCards[i]
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  cardElement.querySelector('.card__photo').src = arr.link
  cardElement.querySelector('.card__text').textContent = arr.name
  cardContainer.prepend(cardElement)}}
cardPlacer ()

function closeProfile() {
  popupProfile.classList.remove('popup_opened')
}

closeButtonProfile.addEventListener('click', closeProfile)

editButton.addEventListener('click', () => {
  popupProfile.classList.add('popup_opened')
})

function formSubmitHandler (evt) {
  evt.preventDefault()
  document.querySelector('.profile__name').textContent = nameInput.value
  document.querySelector('.profile__position').textContent = profInput.value
}
formElement.addEventListener('submit', formSubmitHandler)

saveButton.addEventListener('click', closeProfile)

function closePlace() {
  popupPlace.classList.remove('popup_opened')
}
closeButtonPlace.addEventListener('click', closePlace)

addButton.addEventListener('click', () => {
  sourcePlaceInput.value = ''
  namePlaceInput.value = ''
  popupPlace.classList.add('popup_opened')
})

function formPlaceSubmitHandler (evt) {
  evt.preventDefault()
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  cardElement.querySelector('.card__photo').src = sourcePlaceInput.value
  cardElement.querySelector('.card__text').textContent = namePlaceInput.value
  cardContainer.prepend(cardElement)
  const deleteButton = document.querySelectorAll('.card__trash').forEach((a) => {
    a.addEventListener('click', (e) => {
    const item = e.target.closest('.card')
    item.remove()}) 
  })
  const heartActive = document.querySelectorAll('.card__heart').forEach((b) => {
    b.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__heart_active')})
  })
  const loopButton = document.querySelectorAll('.card__photo').forEach((el) => {
    el.addEventListener('click', (obj) => {
    popupImage.classList.add('popup_opened')
    popupImage.querySelector('.popup__photo').src = obj.target.closest('.card__photo').src
    popupImage.querySelector('.popup__caption').textContent = obj.target.closest('.card').textContent})
  })
} 

formElementPlace.addEventListener('submit', formPlaceSubmitHandler)

createButton.addEventListener('click', closePlace)

const deleteButton = document.querySelectorAll('.card__trash').forEach((a) => {
    a.addEventListener('click', (e) => {
    const item = e.target.closest('.card')
    item.remove()}) 
  })

  const heartActive = document.querySelectorAll('.card__heart').forEach((b) => {
    b.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__heart_active')})
  })

  function closeLoop() {
    popupImage.classList.remove('popup_opened')
  }
  
  closeButtonLoop.addEventListener('click', closeLoop)

  const loopButton = document.querySelectorAll('.card__photo').forEach((el) => {
    el.addEventListener('click', (obj) => {
    popupImage.classList.add('popup_opened')
    popupImage.querySelector('.popup__photo').src = obj.target.closest('.card__photo').src
    popupImage.querySelector('.popup__caption').textContent = obj.target.closest('.card').textContent})
  })
