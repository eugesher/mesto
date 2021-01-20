export default class UserInfo {
  constructor({ profileNameElement, profileAboutElement, profileAvatarLinkElement}) {
    this._profileNameElement = profileNameElement;
    this._profileAboutElement = profileAboutElement;
    this._profileAvatarLinkElement = profileAvatarLinkElement
  }

  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      about: this._profileAboutElement.textContent,
      avatar: this._profileAvatarLinkElement.src
    };
  }

  setUserInfo(data) {
    this._profileNameElement.textContent = data.name;
    this._profileAboutElement.textContent = data.about;
    this._profileAvatarLinkElement.src = data.avatar;
  }
}
