import GhostSearch from './search';

const mySearchSettings = {
  input: '#search-field',
  results: '#searchResults',
  on: {
    beforeFetch: () => {$('body').addClass('is-loading')},
    afterFetch: () => {setTimeout(() => {$('body').removeClass('is-loading')}, 4000)},
  },
}

if (typeof searchSettings !== 'undefined') {
  Object.assign(mySearchSettings, searchSettings); // eslint-disable-line
}

export default () => { return new GhostSearch(mySearchSettings) }
