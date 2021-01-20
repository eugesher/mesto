export default class Section {
  constructor(renderer, container) {
    this._renderer = renderer;
    this._container = container;
  }

  _clear() {
    this._container.innerHTML = "";
  }

  addItem(element, asFirst = false) {
    if (asFirst) this._container.prepend(element);
    else this._container.append(element);
  }

  renderItems(items) {
    this._clear();
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
