import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const currentUser = React.useContext(CurrentUserContext);

  const urlAvatar = React.useRef('');  
  urlAvatar.current.value = '';

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar(
      urlAvatar.current.value
    );
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onUpdateAvatar={onUpdateAvatar}
      name="avatar"
      title="Обновить аватар"
    >
      <input
        className="popup__input"
        type="url"
        name="avatar"
        ref={urlAvatar}
        required
        placeholder="Ссылка на аватар"
        aria-label="Ссылка на аватар"
        autoComplete="off"
      />
      <span className="popup__error avatar-input-error"></span>
    </PopupWithForm>
  );

}

export default EditAvatarPopup;