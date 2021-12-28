(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/* Add Link in the Title for custom-kusi-doc.hbs
/* ---------------------------------------------------------- */
var setup = function setup() {
  // Return if no post box exists
  var markdown = document.querySelector('.js-kusi-doc');
  if (!markdown) return; // Search the titles in the post
  // Return if no title exists

  var argTitles = ['h1', 'h2', 'h3'];
  var titles = markdown.querySelectorAll(argTitles.join(','));
  if (!titles.length) return; // Table of Contents Box

  var jsTableOfContent = document.querySelector('.js-table-content');
  var sidebar = document.querySelector('.js-sidebar-right');
  if (sidebar) document.querySelector('.js-sidebar-wrap').classList.remove('hidden'); // Table of Content sidebar right

  function tableOfContent(link, el) {
    if (!jsTableOfContent) return;
    link.textContent = el.textContent;
    var tocList = document.createElement('li');

    if (el.closest('h3')) {
      link.classList = 'py-1 pl-3 block text-xs hover:text-primary';
    } else {
      link.classList = 'py-2 block hover:text-primary';
    }

    tocList.appendChild(link);
    jsTableOfContent.appendChild(tocList);
  } // Links To Titles


  function linkToTile(link, el) {
    link.setAttribute('aria-hidden', 'true');
    link.innerHTML = '<svg class="icon is-stroke" aria-hidden="true"><use xlink:href="#icon-link"></use></svg>';
    link.classList = 'anchor px-3 inline-block invisible opacity-0 -ml-12 text-gray-500';
    el.insertBefore(link, el.childNodes[0]);
  }

  titles.forEach(function (el) {
    el.classList = 'hover-title';
    var titleLink = document.createElement('a');
    titleLink.href = "#".concat(el.getAttribute('id')); // Table of Content

    tableOfContent(titleLink.cloneNode(true), el); // Link To Title

    linkToTile(titleLink, el);
  });
};

document.addEventListener('DOMContentLoaded', setup);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMva3VzaS1kb2MtcG9zdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7QUFDQTtBQUNBLElBQU0sS0FBSyxHQUFHLFNBQVIsS0FBUSxHQUFNO0FBQ2xCO0FBQ0EsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBakI7QUFDQSxNQUFJLENBQUMsUUFBTCxFQUFlLE9BSEcsQ0FLbEI7QUFDQTs7QUFDQSxNQUFNLFNBQVMsR0FBRyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixDQUFsQjtBQUNBLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixTQUFTLENBQUMsSUFBVixDQUFlLEdBQWYsQ0FBMUIsQ0FBZjtBQUVBLE1BQUksQ0FBQyxNQUFNLENBQUMsTUFBWixFQUFvQixPQVZGLENBWWxCOztBQUNBLE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsbUJBQXZCLENBQXpCO0FBQ0EsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsbUJBQXZCLENBQWhCO0FBRUEsTUFBSSxPQUFKLEVBQWEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLFNBQTNDLENBQXFELE1BQXJELENBQTRELFFBQTVELEVBaEJLLENBa0JsQjs7QUFDQSxXQUFTLGNBQVQsQ0FBeUIsSUFBekIsRUFBK0IsRUFBL0IsRUFBbUM7QUFDakMsUUFBSSxDQUFDLGdCQUFMLEVBQXVCO0FBRXZCLElBQUEsSUFBSSxDQUFDLFdBQUwsR0FBbUIsRUFBRSxDQUFDLFdBQXRCO0FBRUEsUUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBaEI7O0FBRUEsUUFBSSxFQUFFLENBQUMsT0FBSCxDQUFXLElBQVgsQ0FBSixFQUFzQjtBQUNwQixNQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLDRDQUFqQjtBQUNELEtBRkQsTUFFTztBQUNMLE1BQUEsSUFBSSxDQUFDLFNBQUwsR0FBaUIsK0JBQWpCO0FBQ0Q7O0FBRUQsSUFBQSxPQUFPLENBQUMsV0FBUixDQUFvQixJQUFwQjtBQUNBLElBQUEsZ0JBQWdCLENBQUMsV0FBakIsQ0FBNkIsT0FBN0I7QUFDRCxHQWxDaUIsQ0FvQ2xCOzs7QUFDQSxXQUFTLFVBQVQsQ0FBcUIsSUFBckIsRUFBMkIsRUFBM0IsRUFBK0I7QUFDN0IsSUFBQSxJQUFJLENBQUMsWUFBTCxDQUFrQixhQUFsQixFQUFpQyxNQUFqQztBQUNBLElBQUEsSUFBSSxDQUFDLFNBQUwsR0FBaUIsMEZBQWpCO0FBQ0EsSUFBQSxJQUFJLENBQUMsU0FBTCxHQUFpQixtRUFBakI7QUFFQSxJQUFBLEVBQUUsQ0FBQyxZQUFILENBQWdCLElBQWhCLEVBQXNCLEVBQUUsQ0FBQyxVQUFILENBQWMsQ0FBZCxDQUF0QjtBQUNEOztBQUVELEVBQUEsTUFBTSxDQUFDLE9BQVAsQ0FBZSxVQUFBLEVBQUUsRUFBSTtBQUNuQixJQUFBLEVBQUUsQ0FBQyxTQUFILEdBQWUsYUFBZjtBQUVBLFFBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCLENBQWxCO0FBQ0EsSUFBQSxTQUFTLENBQUMsSUFBVixjQUFxQixFQUFFLENBQUMsWUFBSCxDQUFnQixJQUFoQixDQUFyQixFQUptQixDQU1uQjs7QUFDQSxJQUFBLGNBQWMsQ0FBQyxTQUFTLENBQUMsU0FBVixDQUFvQixJQUFwQixDQUFELEVBQTRCLEVBQTVCLENBQWQsQ0FQbUIsQ0FTbkI7O0FBQ0EsSUFBQSxVQUFVLENBQUMsU0FBRCxFQUFZLEVBQVosQ0FBVjtBQUNELEdBWEQ7QUFZRCxDQXpERDs7QUEyREEsUUFBUSxDQUFDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxLQUE5QyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qIEFkZCBMaW5rIGluIHRoZSBUaXRsZSBmb3IgY3VzdG9tLWt1c2ktZG9jLmhic1xyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbmNvbnN0IHNldHVwID0gKCkgPT4ge1xyXG4gIC8vIFJldHVybiBpZiBubyBwb3N0IGJveCBleGlzdHNcclxuICBjb25zdCBtYXJrZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1rdXNpLWRvYycpXHJcbiAgaWYgKCFtYXJrZG93bikgcmV0dXJuXHJcblxyXG4gIC8vIFNlYXJjaCB0aGUgdGl0bGVzIGluIHRoZSBwb3N0XHJcbiAgLy8gUmV0dXJuIGlmIG5vIHRpdGxlIGV4aXN0c1xyXG4gIGNvbnN0IGFyZ1RpdGxlcyA9IFsnaDEnLCAnaDInLCAnaDMnXVxyXG4gIGNvbnN0IHRpdGxlcyA9IG1hcmtkb3duLnF1ZXJ5U2VsZWN0b3JBbGwoYXJnVGl0bGVzLmpvaW4oJywnKSlcclxuXHJcbiAgaWYgKCF0aXRsZXMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgLy8gVGFibGUgb2YgQ29udGVudHMgQm94XHJcbiAgY29uc3QganNUYWJsZU9mQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy10YWJsZS1jb250ZW50JylcclxuICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXNpZGViYXItcmlnaHQnKVxyXG5cclxuICBpZiAoc2lkZWJhcikgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXNpZGViYXItd3JhcCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXHJcblxyXG4gIC8vIFRhYmxlIG9mIENvbnRlbnQgc2lkZWJhciByaWdodFxyXG4gIGZ1bmN0aW9uIHRhYmxlT2ZDb250ZW50IChsaW5rLCBlbCkge1xyXG4gICAgaWYgKCFqc1RhYmxlT2ZDb250ZW50KSByZXR1cm5cclxuXHJcbiAgICBsaW5rLnRleHRDb250ZW50ID0gZWwudGV4dENvbnRlbnRcclxuXHJcbiAgICBjb25zdCB0b2NMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxyXG5cclxuICAgIGlmIChlbC5jbG9zZXN0KCdoMycpKSB7XHJcbiAgICAgIGxpbmsuY2xhc3NMaXN0ID0gJ3B5LTEgcGwtMyBibG9jayB0ZXh0LXhzIGhvdmVyOnRleHQtcHJpbWFyeSdcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxpbmsuY2xhc3NMaXN0ID0gJ3B5LTIgYmxvY2sgaG92ZXI6dGV4dC1wcmltYXJ5J1xyXG4gICAgfVxyXG5cclxuICAgIHRvY0xpc3QuYXBwZW5kQ2hpbGQobGluaylcclxuICAgIGpzVGFibGVPZkNvbnRlbnQuYXBwZW5kQ2hpbGQodG9jTGlzdClcclxuICB9XHJcblxyXG4gIC8vIExpbmtzIFRvIFRpdGxlc1xyXG4gIGZ1bmN0aW9uIGxpbmtUb1RpbGUgKGxpbmssIGVsKSB7XHJcbiAgICBsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpXHJcbiAgICBsaW5rLmlubmVySFRNTCA9ICc8c3ZnIGNsYXNzPVwiaWNvbiBpcy1zdHJva2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1saW5rXCI+PC91c2U+PC9zdmc+J1xyXG4gICAgbGluay5jbGFzc0xpc3QgPSAnYW5jaG9yIHB4LTMgaW5saW5lLWJsb2NrIGludmlzaWJsZSBvcGFjaXR5LTAgLW1sLTEyIHRleHQtZ3JheS01MDAnXHJcblxyXG4gICAgZWwuaW5zZXJ0QmVmb3JlKGxpbmssIGVsLmNoaWxkTm9kZXNbMF0pXHJcbiAgfVxyXG5cclxuICB0aXRsZXMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICBlbC5jbGFzc0xpc3QgPSAnaG92ZXItdGl0bGUnXHJcblxyXG4gICAgY29uc3QgdGl0bGVMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXHJcbiAgICB0aXRsZUxpbmsuaHJlZiA9IGAjJHtlbC5nZXRBdHRyaWJ1dGUoJ2lkJyl9YFxyXG5cclxuICAgIC8vIFRhYmxlIG9mIENvbnRlbnRcclxuICAgIHRhYmxlT2ZDb250ZW50KHRpdGxlTGluay5jbG9uZU5vZGUodHJ1ZSksIGVsKVxyXG5cclxuICAgIC8vIExpbmsgVG8gVGl0bGVcclxuICAgIGxpbmtUb1RpbGUodGl0bGVMaW5rLCBlbClcclxuICB9KVxyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2V0dXApXHJcbiJdfQ==

//# sourceMappingURL=map/kusi-doc-post.js.map
