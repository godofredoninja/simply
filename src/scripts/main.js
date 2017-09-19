// import external dependencies
import 'prismjs';
import 'prismjs/plugins/autoloader/prism-autoloader';
import 'jquery-lazyload';
import 'theia-sticky-sidebar';

// Import everything from autoload
import "./autoload/**/*";

// Pagination infinite scroll
import "./helper/pagination";

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import isArticle from './routes/post';

/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,

  // article
  isArticle,
});

// Load Events
$(document).on('ready', () => routes.loadEvents());
