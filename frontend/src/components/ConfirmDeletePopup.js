import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({ isOpen, onClose, card, onConfirm }) {

    function handleSubmit(evt) {
        evt.preventDefault();
        onConfirm(card);
        onClose();
    };

    return (
        <PopupWithForm
            name="delete"
            title="Вы уверены?"
            buttonTitle="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    );
};

export default ConfirmDeletePopup;