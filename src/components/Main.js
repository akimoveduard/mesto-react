import React from "react";
import Card from "./Card";
import noPhoto from "../images/nophoto.png";

function Main({cards, userData, onEditProfile, onEditAvatar, onAddPlace, onCardClick}) {

  const [userName, setUserName] = React.useState(null);
  const [userDescription, setUserDescription] = React.useState(null);
  const [userAvatar, setUserAvatar] = React.useState(null);

  React.useEffect(() => {
    setUserName(userData.name);
    setUserDescription(userData.about);
    setUserAvatar(userData.avatar);
  })
  
  return (
    <div className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__avatar-wrapper">
          <img className="profile__avatar" src={(userAvatar === undefined || userAvatar === null) ? noPhoto : userAvatar} alt="Аватар пользователя" />
          <button className="button button_type_avatar" name="avatar-button-open" type="button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__username">{(userName === undefined || userName === null) ? ' ' : userName}</h1>
            <button className="button button_type_edit" name="profile-button-open" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__about">{(userDescription === undefined || userDescription === null) ? ' ' : userDescription}</p>
        </div>
        <button className="button button_type_add" name="addcard-button-open" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="photo-grid" aria-label="Карточки мест">
        <ul className="photo-grid__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Main;