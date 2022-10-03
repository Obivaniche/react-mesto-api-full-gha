class Api {

    constructor({ BASE_URL }) {
        this._BASE_URL = BASE_URL;
    };

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    };

    getUserInfo() {
        return fetch(`${this._BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
        }).then(this._checkResponse);
    };

    getInitialCards() {
        return fetch(`${this._BASE_URL}/cards`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
        }).then(this._checkResponse);
    };

    editUserInfo(data) {
        return fetch(`${this._BASE_URL}/users/me`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(this._checkResponse);
    };

    addCard(data) {
        return fetch(`${this._BASE_URL}/cards`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then(this._checkResponse);
    };

    deleteCard(id) {
        return fetch(`${this._BASE_URL}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
        }).then(this._checkResponse);
    };

    toggleLikeStatus(id, isLiked) {
        if (isLiked) {
            return fetch(`${this._BASE_URL}/cards/${id}/likes`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
            }).then(this._checkResponse);
        } else {
            return fetch(`${this._BASE_URL}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
            }).then(this._checkResponse);
        }
    };

    editAvatar(data) {
        return fetch(`${this._BASE_URL}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(this._checkResponse);
    }
};

export const api = new Api({
    BASE_URL: 'https://api.obivaniche.nomoredomains.sbs',
});

export default api;