import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: ''
  });

  const [cards, setCards] = React.useState([]);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

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

  function handleUpdateUser(user) {
    setIsLoading(true);
    api.updateProfile(user.name, user.about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(url) {
    setIsLoading(true);
    api.updateAvatar(url)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    api.changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  React.useEffect(() => {
    Promise.all([
      api.getCards(),
      api.getUserInfo()
    ])
      .then((result) => {
        const [cards, user] = result;
        setCurrentUser(user);
        setCards(cards);
      })
      .catch ((error) => {
        console.log(error)
      })
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
