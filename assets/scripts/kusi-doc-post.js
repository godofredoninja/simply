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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMva3VzaS1kb2MtcG9zdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7QUFDQTtBQUNBLE1BQU0sS0FBSyxHQUFHLE1BQU07RUFDbEI7RUFDQSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztFQUN2RCxJQUFJLENBQUMsUUFBUSxFQUFFOztFQUVmO0VBQ0E7RUFDQSxNQUFNLFNBQVMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7RUFDOUIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFFN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7O0VBRXBCO0VBQ0EsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDO0VBQ3BFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUM7RUFFM0QsSUFBSSxPQUFPLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDOztFQUU5QztFQUNBLFNBQVMsY0FBYyxDQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7SUFDakMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO0lBRXZCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLFdBQVc7SUFFakMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7SUFFNUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO01BQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsNENBQTRDO0lBQy9ELENBQUMsTUFBTTtNQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsb0NBQW9DO0lBQ3ZEO0lBRUEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDekIsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztFQUN2Qzs7RUFFQTtFQUNBLFNBQVMsVUFBVSxDQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7SUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDO0lBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsMEZBQTBGO0lBQzNHLElBQUksQ0FBQyxTQUFTLEdBQUcsbUVBQW1FO0lBRXBGLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDekM7RUFFQSxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSTtJQUNuQixFQUFFLENBQUMsU0FBUyxHQUFHLGFBQWE7SUFFNUIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7SUFDN0MsU0FBUyxDQUFDLElBQUksR0FBSSxJQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFFLEVBQUM7O0lBRTVDO0lBQ0EsY0FBYyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDOztJQUU3QztJQUNBLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDO0VBQzNCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyogQWRkIExpbmsgaW4gdGhlIFRpdGxlIGZvciBjdXN0b20ta3VzaS1kb2MuaGJzXHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuY29uc3Qgc2V0dXAgPSAoKSA9PiB7XHJcbiAgLy8gUmV0dXJuIGlmIG5vIHBvc3QgYm94IGV4aXN0c1xyXG4gIGNvbnN0IG1hcmtkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWt1c2ktZG9jJylcclxuICBpZiAoIW1hcmtkb3duKSByZXR1cm5cclxuXHJcbiAgLy8gU2VhcmNoIHRoZSB0aXRsZXMgaW4gdGhlIHBvc3RcclxuICAvLyBSZXR1cm4gaWYgbm8gdGl0bGUgZXhpc3RzXHJcbiAgY29uc3QgYXJnVGl0bGVzID0gWydoMicsICdoMyddXHJcbiAgY29uc3QgdGl0bGVzID0gbWFya2Rvd24ucXVlcnlTZWxlY3RvckFsbChhcmdUaXRsZXMuam9pbignLCcpKVxyXG5cclxuICBpZiAoIXRpdGxlcy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAvLyBUYWJsZSBvZiBDb250ZW50cyBCb3hcclxuICBjb25zdCBqc1RhYmxlT2ZDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhYmxlLWNvbnRlbnQnKVxyXG4gIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtc2lkZWJhci1yaWdodCcpXHJcblxyXG4gIGlmIChzaWRlYmFyKSBzaWRlYmFyLmNsYXNzTGlzdC5hZGQoJ2xnOmJsb2NrJylcclxuXHJcbiAgLy8gVGFibGUgb2YgQ29udGVudCBzaWRlYmFyIHJpZ2h0XHJcbiAgZnVuY3Rpb24gdGFibGVPZkNvbnRlbnQgKGxpbmssIGVsKSB7XHJcbiAgICBpZiAoIWpzVGFibGVPZkNvbnRlbnQpIHJldHVyblxyXG5cclxuICAgIGxpbmsudGV4dENvbnRlbnQgPSBlbC50ZXh0Q29udGVudFxyXG5cclxuICAgIGNvbnN0IHRvY0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXHJcblxyXG4gICAgaWYgKGVsLmNsb3Nlc3QoJ2gzJykpIHtcclxuICAgICAgbGluay5jbGFzc0xpc3QgPSAncHktMiBweC0zIGRvY3N0b2MgYmxvY2sgaG92ZXI6dGV4dC1wcmltYXJ5J1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGluay5jbGFzc0xpc3QgPSAncHktMiBweC0zIGJsb2NrIGhvdmVyOnRleHQtcHJpbWFyeSdcclxuICAgIH1cclxuXHJcbiAgICB0b2NMaXN0LmFwcGVuZENoaWxkKGxpbmspXHJcbiAgICBqc1RhYmxlT2ZDb250ZW50LmFwcGVuZENoaWxkKHRvY0xpc3QpXHJcbiAgfVxyXG5cclxuICAvLyBMaW5rcyBUbyBUaXRsZXNcclxuICBmdW5jdGlvbiBsaW5rVG9UaWxlIChsaW5rLCBlbCkge1xyXG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxyXG4gICAgbGluay5pbm5lckhUTUwgPSAnPHN2ZyBjbGFzcz1cImljb24gaXMtc3Ryb2tlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tbGlua1wiPjwvdXNlPjwvc3ZnPidcclxuICAgIGxpbmsuY2xhc3NMaXN0ID0gJ2FuY2hvciBweC0zIGlubGluZS1ibG9jayBpbnZpc2libGUgb3BhY2l0eS0wIC1tbC0xMiB0ZXh0LWdyYXktNTAwJ1xyXG5cclxuICAgIGVsLmluc2VydEJlZm9yZShsaW5rLCBlbC5jaGlsZE5vZGVzWzBdKVxyXG4gIH1cclxuXHJcbiAgdGl0bGVzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgZWwuY2xhc3NMaXN0ID0gJ2hvdmVyLXRpdGxlJ1xyXG5cclxuICAgIGNvbnN0IHRpdGxlTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxyXG4gICAgdGl0bGVMaW5rLmhyZWYgPSBgIyR7ZWwuZ2V0QXR0cmlidXRlKCdpZCcpfWBcclxuXHJcbiAgICAvLyBUYWJsZSBvZiBDb250ZW50XHJcbiAgICB0YWJsZU9mQ29udGVudCh0aXRsZUxpbmsuY2xvbmVOb2RlKHRydWUpLCBlbClcclxuXHJcbiAgICAvLyBMaW5rIFRvIFRpdGxlXHJcbiAgICBsaW5rVG9UaWxlKHRpdGxlTGluaywgZWwpXHJcbiAgfSlcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHNldHVwKVxyXG4iXX0=

//# sourceMappingURL=map/kusi-doc-post.js.map
