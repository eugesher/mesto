export class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  addItem(element, asFirst = false) {
    if (asFirst) this._container.prepend(element);
    else this._container.append(element);
  }

  renderDefaultItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
