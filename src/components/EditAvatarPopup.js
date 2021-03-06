import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading
}) {

  const urlAvatar = React.useRef("");

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar(urlAvatar.current.value);
  }

  React.useEffect(() => {
    if (isOpen) urlAvatar.current.value = '';
  },[isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onUpdateAvatar={onUpdateAvatar}
      isLoading={isLoading}
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