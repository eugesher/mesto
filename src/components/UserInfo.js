export class UserInfo {
  constructor({ profileNameElement, profileAboutElement }) {
    this._profileNameElement = profileNameElement;
    this._profileAboutElement = profileAboutElement;
  }

  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      about: this._profileAboutElement.textContent,
    };
  }

  setUserInfo(data) {
    this._profileNameElement.textContent = data.name;
    this._profileAboutElement.textContent = data.about;
  }
}
