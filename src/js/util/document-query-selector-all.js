export default (selector, parent = document) => Array.prototype.slice.call(parent.querySelectorAll(selector), 0)
