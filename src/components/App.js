import React from 'react';
import api from "../utils/Api";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  const [userData, setUserData] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }
  
  React.useEffect(() => {
    Promise.all([
      api.getCards(),
      api.getUserInfo()
    ])
      .then((result) => {
        const [cards, user] = result;
        setUserData(user);
        setCards(cards);
      })
      .catch ((error) => {
        console.log(error)
      })
  }, []);

  return (
    <div className="page__content">
      <Header />
      <Main
        cards={cards}
        userData={userData}
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name="profile"
        title="Редактировать профиль"
      >
        <input
          className="popup__input"
          type="text"
          name="username"
          required
          autoFocus
          placeholder="Имя"
          aria-label="Имя"
          minLength="2"
          maxLength="40"
          autoComplete="off"
        />
        <span className="popup__error username-input-error"></span>
        <input
          className="popup__input"
          type="text"
          name="about"
          required
          placeholder="О себе"
          aria-label="О себе"
          minLength="2"
          maxLength="200"
          autoComplete="off"
        />
        <span className="popup__error about-input-error"></span>
      </PopupWithForm>
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name="avatar"
        title="Обновить аватар"
      >
        <input
          className="popup__input"
          type="url"
          name="avatar"
          required
          placeholder="Ссылка на аватар"
          aria-label="Ссылка на аватар"
          autoComplete="off"
        />
        <span className="popup__error avatar-input-error"></span>
      </PopupWithForm>
      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name="addcard"
        title="Новое место"
        buttonCaption="Создать"
      >
        <input
          className="popup__input"
          type="text"
          name="caption"
          required
          minLength="2"
          maxLength="30"
          autoFocus
          placeholder="Название"
          aria-label="Название места"
          autoComplete="off"
        />
        <span className="popup__error caption-input-error"></span>
        <input
          className="popup__input"
          type="url"
          name="link"
          required
          placeholder="Ссылка на картинку"
          aria-label="Ссылка на картинку"
          autoComplete="off"
        />
        <span className="popup__error link-input-error"></span>
      </PopupWithForm>
      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />
    </div>
  );
}

export default App;
