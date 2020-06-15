// lib
import 'lazysizes'

// Router
import Router from './util/Router'

// Routes
import common from './routes/common'
import isArticle from './routes/post'
import isVideo from './routes/video'

const routes = new Router({
  common, // all pages
  isArticle, // post
  isVideo // Video post format
})

window.addEventListener('load', routes.loadEvents(), false)
