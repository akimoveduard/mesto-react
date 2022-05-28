import React from 'react';

function Card({card, onCardClick}) {

  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <li className="card">
      <button className="button button_type_delete" type="button"></button>
      <img className="card__image" src={card.link} alt={card.name} onClick={handleCardClick} />
      <div className="card__info">
        <h2 className="card__caption">{card.name}</h2>
        <figure className="card__likes">
          <button className="button button_type_like" type="button"></button>
          <figcaption className="card__likes-counter" aria-label="Количество лайков"></figcaption>
        </figure>
      </div>
    </li>
  );
}

export default Card;