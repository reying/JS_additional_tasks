'use strict';

const DomElement = function(selector, options) {
    this.selector = selector;
    options = options || {};
    this.height = options.height;
    this.width = options.width;
    this.bg = options.bg;
    this.fontSize = options.fontSize;
    this.text = options.text;
};

DomElement.prototype.createElem = function() {
    let element = document.createElement('div');

    if (this.selector[0] === '.') {
        let str = this.selector;
        element.className = str.replace('.', '');
    }
    if (this.selector[0] === '#') {
        let str = this.selector;
        element.id = str.replace('#', '');
    }

    element.style.cssText = 'height: ' + this.height + ';' +
        'width: ' + this.width + ';' +
        'background: ' + this.bg + ';' +
        'font-size: ' + this.fontSize + ';';
    element.textContent = this.text;
    document.querySelector('body').appendChild(element);
};

let newElement = new DomElement('.block', {
    height: '100px',
    width: '100%',
    bg: 'green',
    fontSize: '24px',
    text: 'Создан новый элемент!'
});
newElement.createElem();