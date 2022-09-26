/* export const BASE_URL = "https://auth.nomoreparties.co";

const checkResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(new Error(`Ошибка ${res.status}: ${res.statusText}`));
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    console.log(res + ' Auth');
    return checkResponse(res);
  });
};

export const authorization = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return checkResponse(res);
  });
};

export const validationToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}; */

class Auth {
  constructor(url) {
      this._url = url;
  };

  _checkResponse(res) {
      if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

  login(password, email) {
      return fetch(`${this._url}/signin`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({password, email})
      })
      .then((res) => this._checkResponse(res))
  };

  register(password, email) {
      return fetch(`${this._url}/signup`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({password, email})
      })
      .then((res) => this._checkResponse(res))
  };

  getContent = (token) => { 
    return fetch(`${this._url}/users/me`, { 
      method: 'GET', 
      headers: { 
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

const auth = new Auth('http://localhost:3000/');

export default auth;