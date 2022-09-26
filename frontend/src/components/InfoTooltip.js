import React from "react";
import successImage from "../images/ok_msg.svg";
import failImage from "../images/bad_msg.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {

    return (
        <div className={`popup ` + (isOpen && " popup_opened")}
        >
            <div className="popup__container">
                <button
                    className="button popup__close-button"
                    type="button"
                    onClick={onClose}
                >
                </button>
                <div className="popup__tooltip">
                    <img
                        className="popup__tooltip-img"
                        src={isSuccess ? successImage : failImage}
                        alt={isSuccess ? "Успешно!" : "Ошибка!"}
                    />
                    <p className="popup__tooltip-text">{isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}</p>
                </div>
            </div>
        </div>
    );

};

export default InfoTooltip;