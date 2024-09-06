(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = () => {
  const mediaQuery = window.matchMedia('(max-width: 999px)');
  const $head = document.querySelector('.js-header');
  const $menu = $head.querySelector('.js-head-menu');
  const $nav = $menu?.querySelector('.js-nav');
  if (!$nav) return;
  const $logo = $head.querySelector('.header-logo');
  const navHTML = $nav.innerHTML;
  const iconDropdown = '<svg class="icon text-header-link w-7 h-7" viewBox="0 0 512 512"><circle cx="256" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><circle cx="416" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><circle cx="96" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>';
  const makeDropdown = () => {
    if (mediaQuery.matches) return;
    const submenuItems = [];
    while ($nav.offsetWidth + 64 > $menu.offsetWidth) {
      if ($nav.lastElementChild) {
        submenuItems.unshift($nav.lastElementChild);
        $nav.lastElementChild.remove();
      } else {
        break;
      }
    }
    if (!submenuItems.length) {
      // $head.classList.add('is-dropdown-loaded')
      return;
    }
    const toggle = document.createElement('li');
    toggle.setAttribute('class', 'dropdown is-hoverable cursor-pointer');
    // toggle.setAttribute('aria-label', 'More')
    toggle.innerHTML = iconDropdown;
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'dropdown-menu leading-snug whitespace-normal');
    const content = document.createElement('div');
    content.setAttribute('class', 'dropdown-content');
    submenuItems.forEach(function (child) {
      child.querySelector('a').classList.remove('text-header-link');
      child.querySelector('a').classList.add('py-2', 'px-3');
      content.appendChild(child);
    });
    wrapper.appendChild(content);
    toggle.appendChild(wrapper);
    $nav.appendChild(toggle);

    // $head.classList.add('is-dropdown-loaded')
    $menu.classList.remove('overflow-x-hidden');
  };
  makeDropdown();
  window.addEventListener('load', function () {
    // const image = $head.querySelector('.header-logo-img')
    // const isLoaded = image.complete && image.naturalHeight !== 0

    // if (isLoaded) {
    //   makeDropdown()
    // }

    if (!$logo) {
      makeDropdown();
    }
  });
  window.addEventListener('resize', function () {
    setTimeout(() => {
      $nav.innerHTML = navHTML;
      makeDropdown();
    }, 1);
  });
};
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _urlRegularExpression = _interopRequireDefault(require("./util/url-regular-expression"));
var _documentQuerySelectorAll = _interopRequireDefault(require("./util/document-query-selector-all"));
var _dropdown = _interopRequireDefault(require("./app/dropdown"));
/* global followSocialMedia localStorage */

// lib
// import 'lazysizes'

// import loadScript from './util/load-script'

const simplySetup = () => {
  const rootEl = document.documentElement;
  const documentBody = document.body;

  /* Menu DropDown
  /* ---------------------------------------------------------- */
  // const dropDownMenu = () => {
  //   if (typeof menuDropdown !== 'object' || menuDropdown === null) return
  //   const $dropdownMenu = document.querySelector('.js-dropdown-menu')
  //   if (!$dropdownMenu) return

  //   Object.entries(menuDropdown).forEach(([name, url]) => {
  //     if (name !== 'string' && !urlRegexp(url)) return

  //     const link = document.createElement('a')
  //     link.href = url
  //     link.classList = 'dropdown-item block py-2 leading-tight px-5 hover:text-primary'
  //     link.innerText = name

  //     $dropdownMenu.appendChild(link)
  //   })
  // }

  (0, _dropdown.default)();

  /* Social Media
  /* ---------------------------------------------------------- */
  const socialMedia = () => {
    // Checking if the variable exists and if it is an object
    if (typeof followSocialMedia !== 'object' || followSocialMedia === null) return;

    // check if the box for the menu exists
    const $socialMedia = (0, _documentQuerySelectorAll.default)('.js-social-media');
    if (!$socialMedia.length) return;
    const linkElement = element => {
      Object.entries(followSocialMedia).forEach(_ref => {
        let [name, urlTitle] = _ref;
        const url = urlTitle[0];

        // The url is being validated if it is false it returns
        if (!(0, _urlRegularExpression.default)(url)) return;
        const link = document.createElement('a');
        link.href = url;
        link.title = urlTitle[1];
        link.classList = 'p-2 inline-block hover:opacity-70';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.innerHTML = `<svg class="icon"><use xlink:href="#icon-${name}"></use></svg>`;
        element.appendChild(link);
      });
    };
    $socialMedia.forEach(linkElement);
  };
  socialMedia();

  /*  Toggle modal
  /* ---------------------------------------------------------- */
  /*const simplyModal = () => {
    const $modals = docSelectorAll('.js-modal')
    const $modalButtons = docSelectorAll('.js-modal-button')
    const $modalCloses = docSelectorAll('.js-modal-close')
     // Modal Click Open
    if (!$modalButtons.length) return
    $modalButtons.forEach($el => $el.addEventListener('click', () => openModal($el.dataset.target)))
     // Modal Click Close
    if (!$modalCloses.length) return
    $modalCloses.forEach(el => el.addEventListener('click', () => closeModals()))
     const openModal = target => {
      documentBody.classList.remove('has-menu')
      const $target = document.getElementById(target)
      rootEl.classList.add('overflow-hidden')
      $target.classList.add('is-active')
    }
     const closeModals = () => {
      rootEl.classList.remove('overflow-hidden')
      $modals.forEach($el => $el.classList.remove('is-active'))
    }
     document.addEventListener('keydown', function (event) {
      const e = event || window.event
      if (e.keyCode === 27) {
        closeModals()
        // closeDropdowns()
      }
    })
  }
   simplyModal()
  */

  /* Header Transparency
  /* ---------------------------------------------------------- */
  const headerTransparency = () => {
    const hasCover = documentBody.closest('.has-cover');
    const $jsHeader = document.querySelector('.js-header');
    if (documentBody.classList.contains('is-head-stacked')) return;
    window.addEventListener('scroll', () => {
      const lastScrollY = window.scrollY;
      if (lastScrollY > 5) {
        $jsHeader.classList.add('shadow-header', 'header-bg');
      } else {
        $jsHeader.classList.remove('shadow-header', 'header-bg');
      }
      if (!hasCover) return;
      lastScrollY >= 20 ? documentBody.classList.remove('is-head-transparent') : documentBody.classList.add('is-head-transparent');
    }, {
      passive: true
    });
  };
  headerTransparency();

  /* Dark Mode
  /* ---------------------------------------------------------- */
  const darkMode = () => {
    const $toggleDarkMode = (0, _documentQuerySelectorAll.default)('.js-dark-mode');
    if (!$toggleDarkMode.length) return;
    $toggleDarkMode.forEach(item => item.addEventListener('click', function (event) {
      event.preventDefault();
      if (!rootEl.classList.contains('dark')) {
        rootEl.classList.add('dark');
        localStorage.theme = 'dark';
      } else {
        rootEl.classList.remove('dark');
        localStorage.theme = 'light';
      }
    }));
  };
  darkMode();

  /* DropDown Toggle
  /* ---------------------------------------------------------- */
  const dropDownMenuToggle = () => {
    const dropdowns = (0, _documentQuerySelectorAll.default)('.dropdown:not(.is-hoverable)');
    if (!dropdowns.length) return;
    dropdowns.forEach(function (el) {
      el.addEventListener('click', function (event) {
        event.stopPropagation();
        el.classList.toggle('is-active');
        documentBody.classList.remove('has-menu');
      });
    });
    const closeDropdowns = () => dropdowns.forEach(function (el) {
      el.classList.remove('is-active');
    });
    document.addEventListener('click', closeDropdowns);
  };
  dropDownMenuToggle();

  /* Toggle Menu
  /* ---------------------------------------------------------- */
  document.querySelector('.js-menu-toggle').addEventListener('click', function (e) {
    e.preventDefault();
    documentBody.classList.toggle('has-menu');
  });
};
document.addEventListener('DOMContentLoaded', simplySetup);

},{"./app/dropdown":2,"./util/document-query-selector-all":4,"./util/url-regular-expression":5,"@babel/runtime/helpers/interopRequireDefault":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = function _default(selector) {
  let parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.prototype.slice.call(parent.querySelectorAll(selector), 0);
};

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = url => /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/.test(url); //eslint-disable-line
exports.default = _default;

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJzcmMvanMvYXBwL2Ryb3Bkb3duLmpzIiwic3JjL2pzL21haW4uanMiLCJzcmMvanMvdXRpbC9kb2N1bWVudC1xdWVyeS1zZWxlY3Rvci1hbGwuanMiLCJzcmMvanMvdXRpbC91cmwtcmVndWxhci1leHByZXNzaW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztlQ0xlLENBQUEsS0FBTTtFQUNuQixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDO0VBRTFELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO0VBQ2xELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDO0VBQ2xELE1BQU0sSUFBSSxHQUFHLEtBQUssRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDO0VBQzVDLElBQUksQ0FBQyxJQUFJLEVBQUU7RUFFWCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztFQUVqRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUztFQUU5QixNQUFNLFlBQVksR0FBRywrWUFBK1k7RUFFcGEsTUFBTSxZQUFZLEdBQUcsQ0FBQSxLQUFNO0lBQ3pCLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRTtJQUV4QixNQUFNLFlBQVksR0FBRyxFQUFFO0lBRXZCLE9BQVEsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLEdBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtNQUNsRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtRQUN6QixZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxn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Q0FBQyxVQUFVLENBQUM7RUFDM0MsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxXQUFXLENBQUM7Ozs7Ozs7OztpQ0M1TDNDLFNBQUEsU0FBQyxRQUFRO0VBQUEsSUFBRSxNQUFNLEdBQUEsU0FBQSxDQUFBLE1BQUEsUUFBQSxTQUFBLFFBQUEsU0FBQSxHQUFBLFNBQUEsTUFBRyxRQUFRO0VBQUEsT0FBSyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUFBOzs7Ozs7Ozs7ZUNBakcsR0FBRyxJQUFJLGtFQUFrRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQztBQUFBLE9BQUEsQ0FBQSxPQUFBLEdBQUEsUUFBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBjb25zdCBtZWRpYVF1ZXJ5ID0gd2luZG93Lm1hdGNoTWVkaWEoJyhtYXgtd2lkdGg6IDk5OXB4KScpXG5cbiAgY29uc3QgJGhlYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtaGVhZGVyJylcbiAgY29uc3QgJG1lbnUgPSAkaGVhZC5xdWVyeVNlbGVjdG9yKCcuanMtaGVhZC1tZW51JylcbiAgY29uc3QgJG5hdiA9ICRtZW51Py5xdWVyeVNlbGVjdG9yKCcuanMtbmF2JylcbiAgaWYgKCEkbmF2KSByZXR1cm5cblxuICBjb25zdCAkbG9nbyA9ICRoZWFkLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXItbG9nbycpXG5cbiAgY29uc3QgbmF2SFRNTCA9ICRuYXYuaW5uZXJIVE1MXG5cbiAgY29uc3QgaWNvbkRyb3Bkb3duID0gJzxzdmcgY2xhc3M9XCJpY29uIHRleHQtaGVhZGVyLWxpbmsgdy03IGgtN1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjxjaXJjbGUgY3g9XCIyNTZcIiBjeT1cIjI1NlwiIHI9XCIzMlwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIHN0cm9rZS13aWR0aD1cIjMyXCIvPjxjaXJjbGUgY3g9XCI0MTZcIiBjeT1cIjI1NlwiIHI9XCIzMlwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIHN0cm9rZS13aWR0aD1cIjMyXCIvPjxjaXJjbGUgY3g9XCI5NlwiIGN5PVwiMjU2XCIgcj1cIjMyXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIgc3Ryb2tlLXdpZHRoPVwiMzJcIi8+PC9zdmc+J1xuXG4gIGNvbnN0IG1ha2VEcm9wZG93biA9ICgpID0+IHtcbiAgICBpZiAobWVkaWFRdWVyeS5tYXRjaGVzKSByZXR1cm5cblxuICAgIGNvbnN0IHN1Ym1lbnVJdGVtcyA9IFtdXG5cbiAgICB3aGlsZSAoKCRuYXYub2Zmc2V0V2lkdGggKyA2NCkgPiAkbWVudS5vZmZzZXRXaWR0aCkge1xuICAgICAgaWYgKCRuYXYubGFzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICBzdWJtZW51SXRlbXMudW5zaGlmdCgkbmF2Lmxhc3RFbGVtZW50Q2hpbGQpXG4gICAgICAgICRuYXYubGFzdEVsZW1lbnRDaGlsZC5yZW1vdmUoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXN1Ym1lbnVJdGVtcy5sZW5ndGgpIHtcbiAgICAgIC8vICRoZWFkLmNsYXNzTGlzdC5hZGQoJ2lzLWRyb3Bkb3duLWxvYWRlZCcpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgdG9nZ2xlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZHJvcGRvd24gaXMtaG92ZXJhYmxlIGN1cnNvci1wb2ludGVyJylcbiAgICAvLyB0b2dnbGUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ01vcmUnKVxuICAgIHRvZ2dsZS5pbm5lckhUTUwgPSBpY29uRHJvcGRvd25cblxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdkcm9wZG93bi1tZW51IGxlYWRpbmctc251ZyB3aGl0ZXNwYWNlLW5vcm1hbCcpXG5cbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250ZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZHJvcGRvd24tY29udGVudCcpXG5cbiAgICBzdWJtZW51SXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgIGNoaWxkLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5jbGFzc0xpc3QucmVtb3ZlKCd0ZXh0LWhlYWRlci1saW5rJylcbiAgICAgIGNoaWxkLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5jbGFzc0xpc3QuYWRkKCdweS0yJywgJ3B4LTMnKVxuICAgICAgY29udGVudC5hcHBlbmRDaGlsZChjaGlsZClcbiAgICB9KVxuXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChjb250ZW50KVxuICAgIHRvZ2dsZS5hcHBlbmRDaGlsZCh3cmFwcGVyKVxuICAgICRuYXYuYXBwZW5kQ2hpbGQodG9nZ2xlKVxuXG4gICAgLy8gJGhlYWQuY2xhc3NMaXN0LmFkZCgnaXMtZHJvcGRvd24tbG9hZGVkJylcbiAgICAkbWVudS5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyZmxvdy14LWhpZGRlbicpXG4gIH1cblxuICBtYWtlRHJvcGRvd24oKVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgIC8vIGNvbnN0IGltYWdlID0gJGhlYWQucXVlcnlTZWxlY3RvcignLmhlYWRlci1sb2dvLWltZycpXG4gICAgLy8gY29uc3QgaXNMb2FkZWQgPSBpbWFnZS5jb21wbGV0ZSAmJiBpbWFnZS5uYXR1cmFsSGVpZ2h0ICE9PSAwXG5cbiAgICAvLyBpZiAoaXNMb2FkZWQpIHtcbiAgICAvLyAgIG1ha2VEcm9wZG93bigpXG4gICAgLy8gfVxuXG4gICAgaWYgKCEkbG9nbykge1xuICAgICAgbWFrZURyb3Bkb3duKClcbiAgICB9XG4gIH0pXG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICRuYXYuaW5uZXJIVE1MID0gbmF2SFRNTFxuICAgICAgbWFrZURyb3Bkb3duKClcbiAgICB9LCAxKVxuICB9KVxufVxuIiwiLyogZ2xvYmFsIGZvbGxvd1NvY2lhbE1lZGlhIGxvY2FsU3RvcmFnZSAqL1xuXG4vLyBsaWJcbi8vIGltcG9ydCAnbGF6eXNpemVzJ1xuXG4vLyBpbXBvcnQgbG9hZFNjcmlwdCBmcm9tICcuL3V0aWwvbG9hZC1zY3JpcHQnXG5pbXBvcnQgdXJsUmVnZXhwIGZyb20gJy4vdXRpbC91cmwtcmVndWxhci1leHByZXNzaW9uJ1xuaW1wb3J0IGRvY1NlbGVjdG9yQWxsIGZyb20gJy4vdXRpbC9kb2N1bWVudC1xdWVyeS1zZWxlY3Rvci1hbGwnXG5cbmltcG9ydCBkcm9wRG93bk1lbnUgZnJvbSAnLi9hcHAvZHJvcGRvd24nXG5cbmNvbnN0IHNpbXBseVNldHVwID0gKCkgPT4ge1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbiAgY29uc3QgZG9jdW1lbnRCb2R5ID0gZG9jdW1lbnQuYm9keVxuXG4gIC8qIE1lbnUgRHJvcERvd25cbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvLyBjb25zdCBkcm9wRG93bk1lbnUgPSAoKSA9PiB7XG4gIC8vICAgaWYgKHR5cGVvZiBtZW51RHJvcGRvd24gIT09ICdvYmplY3QnIHx8IG1lbnVEcm9wZG93biA9PT0gbnVsbCkgcmV0dXJuXG4gIC8vICAgY29uc3QgJGRyb3Bkb3duTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1kcm9wZG93bi1tZW51JylcbiAgLy8gICBpZiAoISRkcm9wZG93bk1lbnUpIHJldHVyblxuXG4gIC8vICAgT2JqZWN0LmVudHJpZXMobWVudURyb3Bkb3duKS5mb3JFYWNoKChbbmFtZSwgdXJsXSkgPT4ge1xuICAvLyAgICAgaWYgKG5hbWUgIT09ICdzdHJpbmcnICYmICF1cmxSZWdleHAodXJsKSkgcmV0dXJuXG5cbiAgLy8gICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgLy8gICAgIGxpbmsuaHJlZiA9IHVybFxuICAvLyAgICAgbGluay5jbGFzc0xpc3QgPSAnZHJvcGRvd24taXRlbSBibG9jayBweS0yIGxlYWRpbmctdGlnaHQgcHgtNSBob3Zlcjp0ZXh0LXByaW1hcnknXG4gIC8vICAgICBsaW5rLmlubmVyVGV4dCA9IG5hbWVcblxuICAvLyAgICAgJGRyb3Bkb3duTWVudS5hcHBlbmRDaGlsZChsaW5rKVxuICAvLyAgIH0pXG4gIC8vIH1cblxuICBkcm9wRG93bk1lbnUoKVxuXG4gIC8qIFNvY2lhbCBNZWRpYVxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIGNvbnN0IHNvY2lhbE1lZGlhID0gKCkgPT4ge1xuICAgIC8vIENoZWNraW5nIGlmIHRoZSB2YXJpYWJsZSBleGlzdHMgYW5kIGlmIGl0IGlzIGFuIG9iamVjdFxuICAgIGlmICh0eXBlb2YgZm9sbG93U29jaWFsTWVkaWEgIT09ICdvYmplY3QnIHx8IGZvbGxvd1NvY2lhbE1lZGlhID09PSBudWxsKSByZXR1cm5cblxuICAgIC8vIGNoZWNrIGlmIHRoZSBib3ggZm9yIHRoZSBtZW51IGV4aXN0c1xuICAgIGNvbnN0ICRzb2NpYWxNZWRpYSA9IGRvY1NlbGVjdG9yQWxsKCcuanMtc29jaWFsLW1lZGlhJylcbiAgICBpZiAoISRzb2NpYWxNZWRpYS5sZW5ndGgpIHJldHVyblxuXG4gICAgY29uc3QgbGlua0VsZW1lbnQgPSBlbGVtZW50ID0+IHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKGZvbGxvd1NvY2lhbE1lZGlhKS5mb3JFYWNoKChbbmFtZSwgdXJsVGl0bGVdKSA9PiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHVybFRpdGxlWzBdXG5cbiAgICAgICAgLy8gVGhlIHVybCBpcyBiZWluZyB2YWxpZGF0ZWQgaWYgaXQgaXMgZmFsc2UgaXQgcmV0dXJuc1xuICAgICAgICBpZiAoIXVybFJlZ2V4cCh1cmwpKSByZXR1cm5cblxuICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgICAgIGxpbmsuaHJlZiA9IHVybFxuICAgICAgICBsaW5rLnRpdGxlID0gdXJsVGl0bGVbMV1cbiAgICAgICAgbGluay5jbGFzc0xpc3QgPSAncC0yIGlubGluZS1ibG9jayBob3ZlcjpvcGFjaXR5LTcwJ1xuICAgICAgICBsaW5rLnRhcmdldCA9ICdfYmxhbmsnXG4gICAgICAgIGxpbmsucmVsID0gJ25vb3BlbmVyIG5vcmVmZXJyZXInXG4gICAgICAgIGxpbmsuaW5uZXJIVE1MID0gYDxzdmcgY2xhc3M9XCJpY29uXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tJHtuYW1lfVwiPjwvdXNlPjwvc3ZnPmBcblxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGxpbmspXG4gICAgICB9KVxuICAgIH1cblxuICAgICRzb2NpYWxNZWRpYS5mb3JFYWNoKGxpbmtFbGVtZW50KVxuICB9XG5cbiAgc29jaWFsTWVkaWEoKVxuXG4gIC8qICBUb2dnbGUgbW9kYWxcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKmNvbnN0IHNpbXBseU1vZGFsID0gKCkgPT4ge1xuICAgIGNvbnN0ICRtb2RhbHMgPSBkb2NTZWxlY3RvckFsbCgnLmpzLW1vZGFsJylcbiAgICBjb25zdCAkbW9kYWxCdXR0b25zID0gZG9jU2VsZWN0b3JBbGwoJy5qcy1tb2RhbC1idXR0b24nKVxuICAgIGNvbnN0ICRtb2RhbENsb3NlcyA9IGRvY1NlbGVjdG9yQWxsKCcuanMtbW9kYWwtY2xvc2UnKVxuXG4gICAgLy8gTW9kYWwgQ2xpY2sgT3BlblxuICAgIGlmICghJG1vZGFsQnV0dG9ucy5sZW5ndGgpIHJldHVyblxuICAgICRtb2RhbEJ1dHRvbnMuZm9yRWFjaCgkZWwgPT4gJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gb3Blbk1vZGFsKCRlbC5kYXRhc2V0LnRhcmdldCkpKVxuXG4gICAgLy8gTW9kYWwgQ2xpY2sgQ2xvc2VcbiAgICBpZiAoISRtb2RhbENsb3Nlcy5sZW5ndGgpIHJldHVyblxuICAgICRtb2RhbENsb3Nlcy5mb3JFYWNoKGVsID0+IGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VNb2RhbHMoKSkpXG5cbiAgICBjb25zdCBvcGVuTW9kYWwgPSB0YXJnZXQgPT4ge1xuICAgICAgZG9jdW1lbnRCb2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy1tZW51JylcbiAgICAgIGNvbnN0ICR0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXQpXG4gICAgICByb290RWwuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3ctaGlkZGVuJylcbiAgICAgICR0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJylcbiAgICB9XG5cbiAgICBjb25zdCBjbG9zZU1vZGFscyA9ICgpID0+IHtcbiAgICAgIHJvb3RFbC5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyZmxvdy1oaWRkZW4nKVxuICAgICAgJG1vZGFscy5mb3JFYWNoKCRlbCA9PiAkZWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJykpXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgY29uc3QgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudFxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgY2xvc2VNb2RhbHMoKVxuICAgICAgICAvLyBjbG9zZURyb3Bkb3ducygpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHNpbXBseU1vZGFsKClcbiAgKi9cblxuICAvKiBIZWFkZXIgVHJhbnNwYXJlbmN5XG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgY29uc3QgaGVhZGVyVHJhbnNwYXJlbmN5ID0gKCkgPT4ge1xuICAgIGNvbnN0IGhhc0NvdmVyID0gZG9jdW1lbnRCb2R5LmNsb3Nlc3QoJy5oYXMtY292ZXInKVxuICAgIGNvbnN0ICRqc0hlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1oZWFkZXInKVxuXG4gICAgaWYgKGRvY3VtZW50Qm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWhlYWQtc3RhY2tlZCcpKSByZXR1cm5cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICBjb25zdCBsYXN0U2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZXG5cbiAgICAgIGlmIChsYXN0U2Nyb2xsWSA+IDUpIHtcbiAgICAgICAgJGpzSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3NoYWRvdy1oZWFkZXInLCAnaGVhZGVyLWJnJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRqc0hlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzaGFkb3ctaGVhZGVyJywgJ2hlYWRlci1iZycpXG4gICAgICB9XG5cbiAgICAgIGlmICghaGFzQ292ZXIpIHJldHVyblxuXG4gICAgICBsYXN0U2Nyb2xsWSA+PSAyMCA/IGRvY3VtZW50Qm9keS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oZWFkLXRyYW5zcGFyZW50JykgOiBkb2N1bWVudEJvZHkuY2xhc3NMaXN0LmFkZCgnaXMtaGVhZC10cmFuc3BhcmVudCcpXG4gICAgfSwgeyBwYXNzaXZlOiB0cnVlIH0pXG4gIH1cblxuICBoZWFkZXJUcmFuc3BhcmVuY3koKVxuXG4gIC8qIERhcmsgTW9kZVxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIGNvbnN0IGRhcmtNb2RlID0gKCkgPT4ge1xuICAgIGNvbnN0ICR0b2dnbGVEYXJrTW9kZSA9IGRvY1NlbGVjdG9yQWxsKCcuanMtZGFyay1tb2RlJylcblxuICAgIGlmICghJHRvZ2dsZURhcmtNb2RlLmxlbmd0aCkgcmV0dXJuXG5cbiAgICAkdG9nZ2xlRGFya01vZGUuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgICAgaWYgKCFyb290RWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkYXJrJykpIHtcbiAgICAgICAgcm9vdEVsLmNsYXNzTGlzdC5hZGQoJ2RhcmsnKVxuICAgICAgICBsb2NhbFN0b3JhZ2UudGhlbWUgPSAnZGFyaydcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3RFbC5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrJylcbiAgICAgICAgbG9jYWxTdG9yYWdlLnRoZW1lID0gJ2xpZ2h0J1xuICAgICAgfVxuICAgIH0pKVxuICB9XG5cbiAgZGFya01vZGUoKVxuXG4gIC8qIERyb3BEb3duIFRvZ2dsZVxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIGNvbnN0IGRyb3BEb3duTWVudVRvZ2dsZSA9ICgpID0+IHtcbiAgICBjb25zdCBkcm9wZG93bnMgPSBkb2NTZWxlY3RvckFsbCgnLmRyb3Bkb3duOm5vdCguaXMtaG92ZXJhYmxlKScpXG5cbiAgICBpZiAoIWRyb3Bkb3ducy5sZW5ndGgpIHJldHVyblxuXG4gICAgZHJvcGRvd25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKCdpcy1hY3RpdmUnKVxuICAgICAgICBkb2N1bWVudEJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnaGFzLW1lbnUnKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgY29uc3QgY2xvc2VEcm9wZG93bnMgPSAoKSA9PiBkcm9wZG93bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpXG4gICAgfSlcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VEcm9wZG93bnMpXG4gIH1cblxuICBkcm9wRG93bk1lbnVUb2dnbGUoKVxuXG4gIC8qIFRvZ2dsZSBNZW51XG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW1lbnUtdG9nZ2xlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGRvY3VtZW50Qm9keS5jbGFzc0xpc3QudG9nZ2xlKCdoYXMtbWVudScpXG4gIH0pXG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzaW1wbHlTZXR1cClcbiIsImV4cG9ydCBkZWZhdWx0IChzZWxlY3RvciwgcGFyZW50ID0gZG9jdW1lbnQpID0+IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSwgMClcclxuIiwiZXhwb3J0IGRlZmF1bHQgdXJsID0+IC9eKGh0dHBzPzpcXC9cXC8pPyhbXFxkYS16XFwuLV0rKVxcLihbYS16XFwuXXsyLDZ9KShbXFwvXFx3IFxcK1xcLi1dKikqXFwvPyQvLnRlc3QodXJsKSAvL2VzbGludC1kaXNhYmxlLWxpbmVcclxuIl19

//# sourceMappingURL=map/main.js.map
