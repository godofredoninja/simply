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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9rdXNpLWRvYy1wb3N0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0EsSUFBTSxLQUFLLEdBQUcsU0FBUixLQUFRLEdBQU07QUFDbEI7QUFDQSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixDQUFqQjtBQUNBLE1BQUksQ0FBQyxRQUFMLEVBQWUsT0FIRyxDQUtsQjtBQUNBOztBQUNBLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLENBQWxCO0FBQ0EsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGdCQUFULENBQTBCLFNBQVMsQ0FBQyxJQUFWLENBQWUsR0FBZixDQUExQixDQUFmO0FBRUEsTUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFaLEVBQW9CLE9BVkYsQ0FZbEI7O0FBQ0EsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkIsQ0FBekI7QUFDQSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkIsQ0FBaEI7QUFFQSxNQUFJLE9BQUosRUFBYSxRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsU0FBM0MsQ0FBcUQsTUFBckQsQ0FBNEQsUUFBNUQsRUFoQkssQ0FrQmxCOztBQUNBLFdBQVMsY0FBVCxDQUF5QixJQUF6QixFQUErQixFQUEvQixFQUFtQztBQUNqQyxRQUFJLENBQUMsZ0JBQUwsRUFBdUI7QUFFdkIsSUFBQSxJQUFJLENBQUMsV0FBTCxHQUFtQixFQUFFLENBQUMsV0FBdEI7QUFFQSxRQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUFoQjs7QUFFQSxRQUFJLEVBQUUsQ0FBQyxPQUFILENBQVcsSUFBWCxDQUFKLEVBQXNCO0FBQ3BCLE1BQUEsSUFBSSxDQUFDLFNBQUwsR0FBaUIsNENBQWpCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsTUFBQSxJQUFJLENBQUMsU0FBTCxHQUFpQiwrQkFBakI7QUFDRDs7QUFFRCxJQUFBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLElBQXBCO0FBQ0EsSUFBQSxnQkFBZ0IsQ0FBQyxXQUFqQixDQUE2QixPQUE3QjtBQUNELEdBbENpQixDQW9DbEI7OztBQUNBLFdBQVMsVUFBVCxDQUFxQixJQUFyQixFQUEyQixFQUEzQixFQUErQjtBQUM3QixJQUFBLElBQUksQ0FBQyxZQUFMLENBQWtCLGFBQWxCLEVBQWlDLE1BQWpDO0FBQ0EsSUFBQSxJQUFJLENBQUMsU0FBTCxHQUFpQiwwRkFBakI7QUFDQSxJQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLG1FQUFqQjtBQUVBLElBQUEsRUFBRSxDQUFDLFlBQUgsQ0FBZ0IsSUFBaEIsRUFBc0IsRUFBRSxDQUFDLFVBQUgsQ0FBYyxDQUFkLENBQXRCO0FBQ0Q7O0FBRUQsRUFBQSxNQUFNLENBQUMsT0FBUCxDQUFlLFVBQUEsRUFBRSxFQUFJO0FBQ25CLElBQUEsRUFBRSxDQUFDLFNBQUgsR0FBZSxhQUFmO0FBRUEsUUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBbEI7QUFDQSxJQUFBLFNBQVMsQ0FBQyxJQUFWLGNBQXFCLEVBQUUsQ0FBQyxZQUFILENBQWdCLElBQWhCLENBQXJCLEVBSm1CLENBTW5COztBQUNBLElBQUEsY0FBYyxDQUFDLFNBQVMsQ0FBQyxTQUFWLENBQW9CLElBQXBCLENBQUQsRUFBNEIsRUFBNUIsQ0FBZCxDQVBtQixDQVNuQjs7QUFDQSxJQUFBLFVBQVUsQ0FBQyxTQUFELEVBQVksRUFBWixDQUFWO0FBQ0QsR0FYRDtBQVlELENBekREOztBQTJEQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLEtBQTlDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyogQWRkIExpbmsgaW4gdGhlIFRpdGxlIGZvciBjdXN0b20ta3VzaS1kb2MuaGJzXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5jb25zdCBzZXR1cCA9ICgpID0+IHtcbiAgLy8gUmV0dXJuIGlmIG5vIHBvc3QgYm94IGV4aXN0c1xuICBjb25zdCBtYXJrZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1rdXNpLWRvYycpXG4gIGlmICghbWFya2Rvd24pIHJldHVyblxuXG4gIC8vIFNlYXJjaCB0aGUgdGl0bGVzIGluIHRoZSBwb3N0XG4gIC8vIFJldHVybiBpZiBubyB0aXRsZSBleGlzdHNcbiAgY29uc3QgYXJnVGl0bGVzID0gWydoMScsICdoMicsICdoMyddXG4gIGNvbnN0IHRpdGxlcyA9IG1hcmtkb3duLnF1ZXJ5U2VsZWN0b3JBbGwoYXJnVGl0bGVzLmpvaW4oJywnKSlcblxuICBpZiAoIXRpdGxlcy5sZW5ndGgpIHJldHVyblxuXG4gIC8vIFRhYmxlIG9mIENvbnRlbnRzIEJveFxuICBjb25zdCBqc1RhYmxlT2ZDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhYmxlLWNvbnRlbnQnKVxuICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXNpZGViYXItcmlnaHQnKVxuXG4gIGlmIChzaWRlYmFyKSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtc2lkZWJhci13cmFwJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcblxuICAvLyBUYWJsZSBvZiBDb250ZW50IHNpZGViYXIgcmlnaHRcbiAgZnVuY3Rpb24gdGFibGVPZkNvbnRlbnQgKGxpbmssIGVsKSB7XG4gICAgaWYgKCFqc1RhYmxlT2ZDb250ZW50KSByZXR1cm5cblxuICAgIGxpbmsudGV4dENvbnRlbnQgPSBlbC50ZXh0Q29udGVudFxuXG4gICAgY29uc3QgdG9jTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuICAgIGlmIChlbC5jbG9zZXN0KCdoMycpKSB7XG4gICAgICBsaW5rLmNsYXNzTGlzdCA9ICdweS0xIHBsLTMgYmxvY2sgdGV4dC14cyBob3Zlcjp0ZXh0LXByaW1hcnknXG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmsuY2xhc3NMaXN0ID0gJ3B5LTIgYmxvY2sgaG92ZXI6dGV4dC1wcmltYXJ5J1xuICAgIH1cblxuICAgIHRvY0xpc3QuYXBwZW5kQ2hpbGQobGluaylcbiAgICBqc1RhYmxlT2ZDb250ZW50LmFwcGVuZENoaWxkKHRvY0xpc3QpXG4gIH1cblxuICAvLyBMaW5rcyBUbyBUaXRsZXNcbiAgZnVuY3Rpb24gbGlua1RvVGlsZSAobGluaywgZWwpIHtcbiAgICBsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgbGluay5pbm5lckhUTUwgPSAnPHN2ZyBjbGFzcz1cImljb24gaXMtc3Ryb2tlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tbGlua1wiPjwvdXNlPjwvc3ZnPidcbiAgICBsaW5rLmNsYXNzTGlzdCA9ICdhbmNob3IgcHgtMyBpbmxpbmUtYmxvY2sgaW52aXNpYmxlIG9wYWNpdHktMCAtbWwtMTIgdGV4dC1ncmF5LTUwMCdcblxuICAgIGVsLmluc2VydEJlZm9yZShsaW5rLCBlbC5jaGlsZE5vZGVzWzBdKVxuICB9XG5cbiAgdGl0bGVzLmZvckVhY2goZWwgPT4ge1xuICAgIGVsLmNsYXNzTGlzdCA9ICdob3Zlci10aXRsZSdcblxuICAgIGNvbnN0IHRpdGxlTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgIHRpdGxlTGluay5ocmVmID0gYCMke2VsLmdldEF0dHJpYnV0ZSgnaWQnKX1gXG5cbiAgICAvLyBUYWJsZSBvZiBDb250ZW50XG4gICAgdGFibGVPZkNvbnRlbnQodGl0bGVMaW5rLmNsb25lTm9kZSh0cnVlKSwgZWwpXG5cbiAgICAvLyBMaW5rIFRvIFRpdGxlXG4gICAgbGlua1RvVGlsZSh0aXRsZUxpbmssIGVsKVxuICB9KVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2V0dXApXG4iXX0=

//# sourceMappingURL=map/kusi-doc-post.js.map
