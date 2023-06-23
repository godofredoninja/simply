(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/* Add Link in the Title for custom-kusi-doc.hbs
/* ---------------------------------------------------------- */
const setup = () => {
  // Return if no post box exists
  const markdown = document.querySelector('.js-kusi-doc');
  if (!markdown) return;

  // Search the titles in the post
  // Return if no title exists
  const argTitles = ['h2', 'h3'];
  const titles = markdown.querySelectorAll(argTitles.join(','));
  if (!titles.length) return;

  // Table of Contents Box
  const jsTableOfContent = document.querySelector('.js-table-content');
  const sidebar = document.querySelector('.js-sidebar-right');
  if (sidebar) sidebar.classList.add('lg:block');

  // Table of Content sidebar right
  function tableOfContent(link, el) {
    if (!jsTableOfContent) return;
    link.textContent = el.textContent;
    const tocList = document.createElement('li');
    if (el.closest('h3')) {
      link.classList = 'py-2 px-3 docstoc block hover:text-primary';
    } else {
      link.classList = 'py-2 px-3 block hover:text-primary';
    }
    tocList.appendChild(link);
    jsTableOfContent.appendChild(tocList);
  }

  // Links To Titles
  function linkToTile(link, el) {
    link.setAttribute('aria-hidden', 'true');
    link.innerHTML = '<svg class="icon is-stroke" aria-hidden="true"><use xlink:href="#icon-link"></use></svg>';
    link.classList = 'anchor px-3 inline-block invisible opacity-0 -ml-12 text-gray-500';
    el.insertBefore(link, el.childNodes[0]);
  }
  titles.forEach(el => {
    el.classList = 'hover-title';
    const titleLink = document.createElement('a');
    titleLink.href = `#${el.getAttribute('id')}`;

    // Table of Content
    tableOfContent(titleLink.cloneNode(true), el);

    // Link To Title
    linkToTile(titleLink, el);
  });
};
document.addEventListener('DOMContentLoaded', setup);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMva3VzaS1kb2MtcG9zdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7QUFDQTtBQUNBLE1BQU0sS0FBSyxHQUFHLENBQUEsS0FBTTtFQUNsQjtFQUNBLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDO0VBQ3ZELElBQUksQ0FBQyxRQUFRLEVBQUU7O0VBRWY7RUFDQTtFQUNBLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztFQUM5QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUU3RCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTs7RUFFcEI7RUFDQSxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUM7RUFDcEUsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztFQUUzRCxJQUFJLE9BQU8sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7O0VBRTlDO0VBQ0EsU0FBUyxjQUFjLENBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtJQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7SUFFdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVztJQUVqQyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztJQUU1QyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyw0Q0FBNEM7SUFDL0QsQ0FBQyxNQUFNO01BQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxvQ0FBb0M7SUFDdkQ7SUFFQSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztJQUN6QixnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO0VBQ3ZDOztFQUVBO0VBQ0EsU0FBUyxVQUFVLENBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtJQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUM7SUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRywwRkFBMEY7SUFDM0csSUFBSSxDQUFDLFNBQVMsR0FBRyxtRUFBbUU7SUFFcEYsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN6QztFQUVBLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJO0lBQ25CLEVBQUUsQ0FBQyxTQUFTLEdBQUcsYUFBYTtJQUU1QixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztJQUM3QyxTQUFTLENBQUMsSUFBSSxHQUFJLElBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUUsRUFBQzs7SUFFNUM7SUFDQSxjQUFjLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7O0lBRTdDO0lBQ0EsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7RUFDM0IsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKiBBZGQgTGluayBpbiB0aGUgVGl0bGUgZm9yIGN1c3RvbS1rdXNpLWRvYy5oYnNcclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5jb25zdCBzZXR1cCA9ICgpID0+IHtcclxuICAvLyBSZXR1cm4gaWYgbm8gcG9zdCBib3ggZXhpc3RzXHJcbiAgY29uc3QgbWFya2Rvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMta3VzaS1kb2MnKVxyXG4gIGlmICghbWFya2Rvd24pIHJldHVyblxyXG5cclxuICAvLyBTZWFyY2ggdGhlIHRpdGxlcyBpbiB0aGUgcG9zdFxyXG4gIC8vIFJldHVybiBpZiBubyB0aXRsZSBleGlzdHNcclxuICBjb25zdCBhcmdUaXRsZXMgPSBbJ2gyJywgJ2gzJ11cclxuICBjb25zdCB0aXRsZXMgPSBtYXJrZG93bi5xdWVyeVNlbGVjdG9yQWxsKGFyZ1RpdGxlcy5qb2luKCcsJykpXHJcblxyXG4gIGlmICghdGl0bGVzLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gIC8vIFRhYmxlIG9mIENvbnRlbnRzIEJveFxyXG4gIGNvbnN0IGpzVGFibGVPZkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtdGFibGUtY29udGVudCcpXHJcbiAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1zaWRlYmFyLXJpZ2h0JylcclxuXHJcbiAgaWYgKHNpZGViYXIpIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnbGc6YmxvY2snKVxyXG5cclxuICAvLyBUYWJsZSBvZiBDb250ZW50IHNpZGViYXIgcmlnaHRcclxuICBmdW5jdGlvbiB0YWJsZU9mQ29udGVudCAobGluaywgZWwpIHtcclxuICAgIGlmICghanNUYWJsZU9mQ29udGVudCkgcmV0dXJuXHJcblxyXG4gICAgbGluay50ZXh0Q29udGVudCA9IGVsLnRleHRDb250ZW50XHJcblxyXG4gICAgY29uc3QgdG9jTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcclxuXHJcbiAgICBpZiAoZWwuY2xvc2VzdCgnaDMnKSkge1xyXG4gICAgICBsaW5rLmNsYXNzTGlzdCA9ICdweS0yIHB4LTMgZG9jc3RvYyBibG9jayBob3Zlcjp0ZXh0LXByaW1hcnknXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsaW5rLmNsYXNzTGlzdCA9ICdweS0yIHB4LTMgYmxvY2sgaG92ZXI6dGV4dC1wcmltYXJ5J1xyXG4gICAgfVxyXG5cclxuICAgIHRvY0xpc3QuYXBwZW5kQ2hpbGQobGluaylcclxuICAgIGpzVGFibGVPZkNvbnRlbnQuYXBwZW5kQ2hpbGQodG9jTGlzdClcclxuICB9XHJcblxyXG4gIC8vIExpbmtzIFRvIFRpdGxlc1xyXG4gIGZ1bmN0aW9uIGxpbmtUb1RpbGUgKGxpbmssIGVsKSB7XHJcbiAgICBsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpXHJcbiAgICBsaW5rLmlubmVySFRNTCA9ICc8c3ZnIGNsYXNzPVwiaWNvbiBpcy1zdHJva2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1saW5rXCI+PC91c2U+PC9zdmc+J1xyXG4gICAgbGluay5jbGFzc0xpc3QgPSAnYW5jaG9yIHB4LTMgaW5saW5lLWJsb2NrIGludmlzaWJsZSBvcGFjaXR5LTAgLW1sLTEyIHRleHQtZ3JheS01MDAnXHJcblxyXG4gICAgZWwuaW5zZXJ0QmVmb3JlKGxpbmssIGVsLmNoaWxkTm9kZXNbMF0pXHJcbiAgfVxyXG5cclxuICB0aXRsZXMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICBlbC5jbGFzc0xpc3QgPSAnaG92ZXItdGl0bGUnXHJcblxyXG4gICAgY29uc3QgdGl0bGVMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXHJcbiAgICB0aXRsZUxpbmsuaHJlZiA9IGAjJHtlbC5nZXRBdHRyaWJ1dGUoJ2lkJyl9YFxyXG5cclxuICAgIC8vIFRhYmxlIG9mIENvbnRlbnRcclxuICAgIHRhYmxlT2ZDb250ZW50KHRpdGxlTGluay5jbG9uZU5vZGUodHJ1ZSksIGVsKVxyXG5cclxuICAgIC8vIExpbmsgVG8gVGl0bGVcclxuICAgIGxpbmtUb1RpbGUodGl0bGVMaW5rLCBlbClcclxuICB9KVxyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2V0dXApXHJcbiJdfQ==

//# sourceMappingURL=map/kusi-doc-post.js.map
