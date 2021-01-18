export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then((r) => {
      if (r.ok) return r.json();
      else return Promise.reject(`Ошибка(Api.getUserInfo): ${r.status}`);
    });
  }
  
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then((r) => {
      if (r.ok) return r.json();
      else return Promise.reject(`Ошибка(Api.getInitialCards): ${r.status}`);
    });
  }
  
  patchUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about }),
    }).then((r) => {
      if (r.ok) return r.json();
      else return Promise.reject(`Ошибка(Api.editProfile): ${r.status}`);
    });
  }
  
  postCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: name, link: link }),
    }).then((r) => {
      if (r.ok) return r.json();
      else return Promise.reject(`Ошибка(Api.postCard): ${r.status}`);
    });
  }
  
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((r) => {
      console.log(cardId)
      if (r.ok) return r.json();
      else return Promise.reject(`Ошибка(Api.deleteCard): ${r.status}`);
    });
  }
}