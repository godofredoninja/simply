// import external dependencies
import 'prismjs/components/prism-core';
import 'prismjs/plugins/autoloader/prism-autoloader';
import 'theia-sticky-sidebar';

// Import everything from autoload
import './autoload/**/*';

import './app/simply'

// Pagination infinite scroll
import './pagination'

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import isArticle from './routes/post'; // <body class="is-article">
import isVideo from './routes/video'; // <body class="is-video">
import isNewsletter from './routes/newsletter';
// import isAudio from './routes/audio';


/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  // article
  isArticle,
  // video post format
  isVideo,
  // Audio post Format
  // isAudio,
  // Newsletter
  isNewsletter,
});

// Load Events
$(document).on('ready', () => routes.loadEvents());
