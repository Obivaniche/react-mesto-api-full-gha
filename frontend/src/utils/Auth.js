class Auth {
  constructor(BASE_URL) {
    this._BASE_URL = BASE_URL;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  login({email, password}) {
    return fetch(`${this._BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
      .then((res) => this._checkResponse(res))
  };

  register({email, password}) {
    return fetch(`${this._BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
      .then((res) => this._checkResponse(res))
  };

  getContent = (token) => {
    return fetch(`${this._BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    })
      .then((res) => this._checkResponse(res))
      .then(data => {
        return data;
      })
  }
};

const auth = new Auth('https://api.obivaniche.nomoredomains.sbs');

export default auth;