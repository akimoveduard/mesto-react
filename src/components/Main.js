import React from "react";
import api from "../utils/Api";
import Card from "./Card";
import noPhoto from "../images/nophoto.png";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
      api.getCards()
      .then((result) => {
        setCards(result);
      })
      .catch ((error) => {
        console.log(error)
      })
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    api.changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      });
  }
 
  return (
    <div className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__avatar-wrapper">
          <img className="profile__avatar" src={(currentUser.avatar === undefined || currentUser.avatar === null) ? noPhoto : currentUser.avatar} alt="Аватар пользователя" />
          <button className="button button_type_avatar" name="avatar-button-open" type="button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__username">{(currentUser.name === undefined || currentUser.name === null) ? ' ' : currentUser.name}</h1>
            <button className="button button_type_edit" name="profile-button-open" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__about">{(currentUser.about === undefined || currentUser.about === null) ? ' ' : currentUser.about}</p>
        </div>
        <button className="button button_type_add" name="addcard-button-open" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="photo-grid" aria-label="Карточки мест">
        <ul className="photo-grid__list">
          <CurrentUserContext.Provider value={currentUser}>
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
              />
            ))}
          </CurrentUserContext.Provider>
        </ul>
      </section>
    </div>
  );
}

export default Main;