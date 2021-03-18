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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9rdXNpLWRvYy1wb3N0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0EsSUFBTSxLQUFLLEdBQUcsU0FBUixLQUFRLEdBQU07QUFDbEI7QUFDQSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixDQUFqQjtBQUNBLE1BQUksQ0FBQyxRQUFMLEVBQWUsT0FIRyxDQUtsQjtBQUNBOztBQUNBLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLENBQWxCO0FBQ0EsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGdCQUFULENBQTBCLFNBQVMsQ0FBQyxJQUFWLENBQWUsR0FBZixDQUExQixDQUFmO0FBRUEsTUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFaLEVBQW9CLE9BVkYsQ0FZbEI7O0FBQ0EsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkIsQ0FBekI7QUFDQSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkIsQ0FBaEI7QUFFQSxNQUFJLE9BQUosRUFBYSxRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsU0FBM0MsQ0FBcUQsTUFBckQsQ0FBNEQsUUFBNUQsRUFoQkssQ0FrQmxCOztBQUNBLFdBQVMsY0FBVCxDQUF5QixJQUF6QixFQUErQixFQUEvQixFQUFtQztBQUNqQyxRQUFJLENBQUMsZ0JBQUwsRUFBdUI7QUFFdkIsSUFBQSxJQUFJLENBQUMsV0FBTCxHQUFtQixFQUFFLENBQUMsV0FBdEI7QUFFQSxRQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUFoQjs7QUFFQSxRQUFJLEVBQUUsQ0FBQyxPQUFILENBQVcsSUFBWCxDQUFKLEVBQXNCO0FBQ3BCLE1BQUEsSUFBSSxDQUFDLFNBQUwsR0FBaUIsNENBQWpCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsTUFBQSxJQUFJLENBQUMsU0FBTCxHQUFpQiwrQkFBakI7QUFDRDs7QUFFRCxJQUFBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLElBQXBCO0FBQ0EsSUFBQSxnQkFBZ0IsQ0FBQyxXQUFqQixDQUE2QixPQUE3QjtBQUNELEdBbENpQixDQW9DbEI7OztBQUNBLFdBQVMsVUFBVCxDQUFxQixJQUFyQixFQUEyQixFQUEzQixFQUErQjtBQUM3QixJQUFBLElBQUksQ0FBQyxZQUFMLENBQWtCLGFBQWxCLEVBQWlDLE1BQWpDO0FBQ0EsSUFBQSxJQUFJLENBQUMsU0FBTCxHQUFpQiwwRkFBakI7QUFDQSxJQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLG1FQUFqQjtBQUVBLElBQUEsRUFBRSxDQUFDLFlBQUgsQ0FBZ0IsSUFBaEIsRUFBc0IsRUFBRSxDQUFDLFVBQUgsQ0FBYyxDQUFkLENBQXRCO0FBQ0Q7O0FBRUQsRUFBQSxNQUFNLENBQUMsT0FBUCxDQUFlLFVBQUEsRUFBRSxFQUFJO0FBQ25CLElBQUEsRUFBRSxDQUFDLFNBQUgsR0FBZSxhQUFmO0FBRUEsUUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBbEI7QUFDQSxJQUFBLFNBQVMsQ0FBQyxJQUFWLGNBQXFCLEVBQUUsQ0FBQyxZQUFILENBQWdCLElBQWhCLENBQXJCLEVBSm1CLENBTW5COztBQUNBLElBQUEsY0FBYyxDQUFDLFNBQVMsQ0FBQyxTQUFWLENBQW9CLElBQXBCLENBQUQsRUFBNEIsRUFBNUIsQ0FBZCxDQVBtQixDQVNuQjs7QUFDQSxJQUFBLFVBQVUsQ0FBQyxTQUFELEVBQVksRUFBWixDQUFWO0FBQ0QsR0FYRDtBQVlELENBekREOztBQTJEQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLEtBQTlDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyogQWRkIExpbmsgaW4gdGhlIFRpdGxlIGZvciBjdXN0b20ta3VzaS1kb2MuaGJzXHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuY29uc3Qgc2V0dXAgPSAoKSA9PiB7XHJcbiAgLy8gUmV0dXJuIGlmIG5vIHBvc3QgYm94IGV4aXN0c1xyXG4gIGNvbnN0IG1hcmtkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWt1c2ktZG9jJylcclxuICBpZiAoIW1hcmtkb3duKSByZXR1cm5cclxuXHJcbiAgLy8gU2VhcmNoIHRoZSB0aXRsZXMgaW4gdGhlIHBvc3RcclxuICAvLyBSZXR1cm4gaWYgbm8gdGl0bGUgZXhpc3RzXHJcbiAgY29uc3QgYXJnVGl0bGVzID0gWydoMScsICdoMicsICdoMyddXHJcbiAgY29uc3QgdGl0bGVzID0gbWFya2Rvd24ucXVlcnlTZWxlY3RvckFsbChhcmdUaXRsZXMuam9pbignLCcpKVxyXG5cclxuICBpZiAoIXRpdGxlcy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAvLyBUYWJsZSBvZiBDb250ZW50cyBCb3hcclxuICBjb25zdCBqc1RhYmxlT2ZDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhYmxlLWNvbnRlbnQnKVxyXG4gIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtc2lkZWJhci1yaWdodCcpXHJcblxyXG4gIGlmIChzaWRlYmFyKSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtc2lkZWJhci13cmFwJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcclxuXHJcbiAgLy8gVGFibGUgb2YgQ29udGVudCBzaWRlYmFyIHJpZ2h0XHJcbiAgZnVuY3Rpb24gdGFibGVPZkNvbnRlbnQgKGxpbmssIGVsKSB7XHJcbiAgICBpZiAoIWpzVGFibGVPZkNvbnRlbnQpIHJldHVyblxyXG5cclxuICAgIGxpbmsudGV4dENvbnRlbnQgPSBlbC50ZXh0Q29udGVudFxyXG5cclxuICAgIGNvbnN0IHRvY0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXHJcblxyXG4gICAgaWYgKGVsLmNsb3Nlc3QoJ2gzJykpIHtcclxuICAgICAgbGluay5jbGFzc0xpc3QgPSAncHktMSBwbC0zIGJsb2NrIHRleHQteHMgaG92ZXI6dGV4dC1wcmltYXJ5J1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGluay5jbGFzc0xpc3QgPSAncHktMiBibG9jayBob3Zlcjp0ZXh0LXByaW1hcnknXHJcbiAgICB9XHJcblxyXG4gICAgdG9jTGlzdC5hcHBlbmRDaGlsZChsaW5rKVxyXG4gICAganNUYWJsZU9mQ29udGVudC5hcHBlbmRDaGlsZCh0b2NMaXN0KVxyXG4gIH1cclxuXHJcbiAgLy8gTGlua3MgVG8gVGl0bGVzXHJcbiAgZnVuY3Rpb24gbGlua1RvVGlsZSAobGluaywgZWwpIHtcclxuICAgIGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJylcclxuICAgIGxpbmsuaW5uZXJIVE1MID0gJzxzdmcgY2xhc3M9XCJpY29uIGlzLXN0cm9rZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWxpbmtcIj48L3VzZT48L3N2Zz4nXHJcbiAgICBsaW5rLmNsYXNzTGlzdCA9ICdhbmNob3IgcHgtMyBpbmxpbmUtYmxvY2sgaW52aXNpYmxlIG9wYWNpdHktMCAtbWwtMTIgdGV4dC1ncmF5LTUwMCdcclxuXHJcbiAgICBlbC5pbnNlcnRCZWZvcmUobGluaywgZWwuY2hpbGROb2Rlc1swXSlcclxuICB9XHJcblxyXG4gIHRpdGxlcy5mb3JFYWNoKGVsID0+IHtcclxuICAgIGVsLmNsYXNzTGlzdCA9ICdob3Zlci10aXRsZSdcclxuXHJcbiAgICBjb25zdCB0aXRsZUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcclxuICAgIHRpdGxlTGluay5ocmVmID0gYCMke2VsLmdldEF0dHJpYnV0ZSgnaWQnKX1gXHJcblxyXG4gICAgLy8gVGFibGUgb2YgQ29udGVudFxyXG4gICAgdGFibGVPZkNvbnRlbnQodGl0bGVMaW5rLmNsb25lTm9kZSh0cnVlKSwgZWwpXHJcblxyXG4gICAgLy8gTGluayBUbyBUaXRsZVxyXG4gICAgbGlua1RvVGlsZSh0aXRsZUxpbmssIGVsKVxyXG4gIH0pXHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzZXR1cClcclxuIl19

//# sourceMappingURL=map/kusi-doc-post.js.map
