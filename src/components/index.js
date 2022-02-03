import '../index.css';
import {enableValidation, validationConfig} from "./validate";
import {renderCards, setCardListeners} from "./card";
import {setUserData, setUserListeners} from "./user";
import {closePopup} from "./modal";
import {getAppInfo} from "./api";

const popups = document.querySelectorAll('.popup')
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

setUserListeners()

setCardListeners()

getAppInfo()
    .then(([user, cards]) => {
      setUserData(user)
      renderCards(cards, user._id)
    })
    .catch(err => console.log(err))

enableValidation(validationConfig)