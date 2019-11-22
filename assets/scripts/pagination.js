(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

(function (window, document) {
  // Next link Element
  var nextElement = document.querySelector('link[rel=next]');
  if (!nextElement) return; // Post Feed element

  var feedElement = document.querySelector('.feed-entry-content');
  if (!feedElement) return;
  var buffer = 300;
  var ticking = false;
  var loading = false;
  var lastScrollY = window.scrollY;
  var lastWindowHeight = window.innerHeight;
  var lastDocumentHeight = document.documentElement.scrollHeight;

  function onPageLoad() {
    if (this.status === 404) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      return;
    } // append contents


    var postElements = this.response.querySelector('.feed-entry-wrap');
    feedElement.appendChild(postElements); // push state

    window.history.pushState(null, document.title, nextElement.href); // Change Title

    document.title = this.response.title; // set next link

    var resNextElement = this.response.querySelector('link[rel=next]');

    if (resNextElement) {
      nextElement.href = resNextElement.href;
    } else {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    } // sync status


    lastDocumentHeight = document.documentElement.scrollHeight;
    ticking = false;
    loading = false;
  }

  function onUpdate() {
    // Retur if already loading
    if (loading) return; // return if not scroll to the bottom

    if (lastScrollY + lastWindowHeight <= lastDocumentHeight - buffer) {
      ticking = false;
      return;
    }

    loading = true;
    var xhr = new window.XMLHttpRequest();
    xhr.responseType = 'document';
    xhr.addEventListener('load', onPageLoad);
    xhr.open('GET', nextElement.href);
    xhr.send(null);
  }

  function requestTick() {
    ticking || window.requestAnimationFrame(onUpdate);
    ticking = true;
  }

  function onScroll() {
    lastScrollY = window.scrollY;
    requestTick();
  }

  function onResize() {
    lastWindowHeight = window.innerHeight;
    lastDocumentHeight = document.documentElement.scrollHeight;
    requestTick();
  }

  window.addEventListener('scroll', onScroll, {
    passive: true
  });
  window.addEventListener('resize', onResize);
  requestTick();
})(window, document);

},{}]},{},[1])

//# sourceMappingURL=map/pagination.js.map
