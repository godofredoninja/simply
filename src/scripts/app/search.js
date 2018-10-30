/**
 * Thanks => https://github.com/HauntedThemes/ghost-search
 */

// import fuzzysort from 'fuzzysort';
const fuzzysort = require('fuzzysort');

class GhostSearch {
  constructor(args) {

    this.check = false;

    const defaults = {
      input: '#ghost-search-field',
      results: '#ghost-search-results',
      button: '',
      development: false,
      template: function (result) {
        let url = [location.protocol, '//', location.host].join('');
        return '<a href="' + url + '/' + result.slug + '/">' + result.title + '</a>';
      },
      trigger: 'focus',
      options: {
        keys: [
          'title',
        ],
        limit: 10,
        threshold: -3500,
        allowTypo: false,
      },
      api: {
        resource: 'posts',
        parameters: {
          limit: 'all',
          fields: ['title', 'slug'],
          filter: '',
          include: '',
          order: '',
          formats: '',
        },
      },
      on: {
        beforeDisplay: function () { },
        afterDisplay: function (results) { },// eslint-disable-line
        beforeFetch: function () { },
        afterFetch: function (results) { },// eslint-disable-line
      },
    }

    const merged = this.mergeDeep(defaults, args);
    Object.assign(this, merged);
    this.init();

  }

  mergeDeep(target, source) {
    if ((target && typeof target === 'object' && !Array.isArray(target) && target !== null) && (source && typeof source === 'object' && !Array.isArray(source) && source !== null)) {
      Object.keys(source).forEach(key => {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) && source[key] !== null) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          this.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      });
    }
    return target;
  }

  url() {

    if (this.api.resource == 'posts' && this.api.parameters.include.match(/(tags|authors)/)) {
      delete this.api.parameters.fields;
    }

    let url = ghost.url.api(this.api.resource, this.api.parameters); //eslint-disable-line

    return url;

  }

  fetch() {

    let url = this.url();

    this.on.beforeFetch();

    fetch(url)
      .then(response => response.json())
      .then(resource => this.search(resource))
      .catch(error => console.error(`Fetch Error =\n`, error));

  }

  createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }

  cleanup(input) {
    return input.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
  }

  displayResults(data) {

    if (document.querySelectorAll(this.results)[0].firstChild !== null && document.querySelectorAll(this.results)[0].firstChild !== '') {
      while (document.querySelectorAll(this.results)[0].firstChild) {
        document.querySelectorAll(this.results)[0].removeChild(document.querySelectorAll(this.results)[0].firstChild);
      }
    }

    let inputValue = document.querySelectorAll(this.input)[0].value;
    const results = fuzzysort.go(inputValue, data, {
      keys: this.options.keys,
      limit: this.options.limit,
      allowTypo: this.options.allowTypo,
      threshold: this.options.threshold,
    });
    for (let key in results) {
      if (key < results.length) {
        document.querySelectorAll(this.results)[0].appendChild(this.createElementFromHTML(this.template(results[key].obj)));
      }
    }

    this.on.afterDisplay(results)

  }

  search(resource) {

    let data = resource[this.api.resource];

    this.on.afterFetch(data);
    this.check = true;

    if (this.button != '') {
      let button = document.querySelectorAll(this.button)[0];
      if (button.tagName == 'INPUT' && button.type == 'submit') {
        button.closest('form').addEventListener("submit", e => {
          e.preventDefault()
        });
      }
      button.addEventListener('click', e => {
        e.preventDefault()
        this.on.beforeDisplay()
        this.displayResults(data)
      })
    } else {
      document.querySelectorAll(this.input)[0].addEventListener('keyup', () => {
        this.on.beforeDisplay()
        this.displayResults(data)
      })
    }

  }

  checkGhostAPI() {
    if (typeof ghost === 'undefined') {
      console.log('Ghost API is not enabled');
      return false;
    }
    return true;
  }

  checkElements() {
    if (!document.querySelectorAll(this.input).length) {
      console.log('Input not found.');
      return false;
    }
    if (!document.querySelectorAll(this.results).length) {
      console.log('Results not found.');
      return false;
    }
    if (this.button != '') {
      if (!document.querySelectorAll(this.button).length) {
        console.log('Button not found.');
        return false;
      }
    }
    return true;
  }

  checkFields() {

    let validFields = [];

    if (this.api.resource == 'posts') {
      validFields = ['amp', 'authors', 'codeinjection_foot', 'codeinjection_head', 'comment_id', 'created_at', 'created_by', 'custom_excerpt', 'custom_template', 'feature_image', 'featured', 'html', 'id', 'locale', 'meta_description', 'meta_title', 'mobiledoc', 'og_description', 'og_image', 'og_title', 'page', 'plaintext', 'primary_author', 'primary_tag', 'published_at', 'published_by', 'slug', 'status', 'tags', 'title', 'twitter_description', 'twitter_image', 'twitter_title', 'updated_at', 'updated_by', 'url', 'uuid', 'visibility'];
    } else if (this.api.resource == 'tags') {
      validFields = ['count', 'created_at', 'created_by', 'description', 'feature_image', 'id', 'meta_description', 'meta_title', 'name', 'parent', 'slug', 'updated_at', 'updated_by', 'visibility']
    } else if (this.api.resource == 'users') {
      validFields = ['accessibility', 'bio', 'count', 'cover_image', 'facebook', 'id', 'locale', 'location', 'meta_description', 'meta_title', 'name', 'profile_image', 'slug', 'tour', 'twitter', 'visibility', 'website']
    }

    for (let i = 0; i < this.api.parameters.fields.length; i++) {
      if (!validFields.includes(this.api.parameters.fields[i])) {
        console.log('\'' + this.api.parameters.fields[i] + '\' is not a valid field for ' + this.api.resource + '. Valid fields for ' + this.api.resource + ': [\'' + validFields.join('\', \'') + '\']');
      }
    }

  }

  checkFormats() {
    if (this.api.resource == 'posts' && (this.api.parameters.fields && typeof this.api.parameters.fields === 'object' && this.api.parameters.fields.constructor === Array)) {
      for (let i = 0; i < this.api.parameters.fields.length; i++) {
        if (
          !this.api.parameters.formats.includes(this.api.parameters.fields[i]) && this.api.parameters.fields[i].match(/(plaintext|mobiledoc|amp)/) ||
          (this.api.parameters.fields[i] == 'html' && this.api.parameters.formats.length > 0 && !this.api.parameters.formats.includes('html'))
        ) {
          console.log(this.api.parameters.fields[i] + ' is not included in the formats parameter.');
        }
      }
    }
  }

  checkKeys() {
    if (!this.options.keys.every(elem => this.api.parameters.fields.indexOf(elem) > -1)) {
      console.log('Not all keys are in fields. Please add them.');
    }
  }

  validate() {

    if (!this.checkGhostAPI() || !this.checkElements()) {
      return false;
    }

    if (this.development) {
      this.checkFields();
      this.checkFormats();
      this.checkKeys();
    }

    return true;

  }

  init() {

    if (!this.validate()) {
      return;
    }

    if (this.trigger == 'focus') {
      document.querySelectorAll(this.input)[0].addEventListener('focus', () => {
        if (!this.check) {
          this.fetch()
        }
      })
    } else if (this.trigger == 'load') {
      window.onload = () => {
        if (!this.check) {
          this.fetch()
        }
      }
    }

  }

}

/* Export Class */
module.exports = GhostSearch;
