/* global fetch */

// https://github.com/gmfmi/searchinGhost

import FlexSearch from 'flexsearch'

export default class SearchinGhost {
  /**
   * Constructor and entry point of the library
   * @param {Document} args
   */
  constructor (args) {
    this.config = {
      url: window.location.origin,
      key: '',
      version: 'v4',
      loadOn: 'focus',
      searchOn: 'keyup',
      limit: 10,
      inputId: ['search-field'],
      outputId: ['search-results'],
      outputChildsType: 'li',
      //
      postsFields: ['title', 'url', 'published_at'],
      postsExtraFields: [],
      postsFormats: [],
      indexedFields: ['title'],
      template: post => `<a class="flex items-center noWrapWithEllipsis px-4 py-2" href="${post.url}"><svg class="icon flex-none mr-2"><use xlink:href="#icon-search"></use></svg> <span>${post.name === undefined ? post.title : post.name}</span></a>`,
      // template: function (post) {},
      //
      // postsFields: ['title', 'url', 'excerpt', 'custom_excerpt', 'published_at', 'feature_image'],
      // postsExtraFields: ['tags'],
      // postsFormats: ['plaintext'],
      // indexedFields: ['title', 'string_tags', 'excerpt', 'plaintext'],
      // template: function (post) {
      //   let o = `<a href='${post.url}'>`
      //   if (post.feature_image) o += `<img src='${post.feature_image}'>`
      //   o += '<section>'
      //   o += `<h2>${post.title}</h2>`
      //   o += `</section></a>`
      //   return o
      // },
      emptyTemplate: function () {},
      customProcessing: function (post) {
        if (post.tags) post.string_tags = post.tags.map(o => o.name).join(' ').toLowerCase()
        return post
      },
      date: {
        locale: document.documentElement.lang || 'en-US',
        options: {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }
      },
      cacheMaxAge: 1800,
      onFetchStart: () => document.body.classList.add('is-loading'),
      onFetchEnd: () => setTimeout(() => { document.body.classList.remove('is-loading') }, 4000),
      onIndexBuildStart: function () {},
      onIndexBuildEnd: function (index) {},
      onSearchStart: function () {},
      onSearchEnd: function (posts) {},
      indexOptions: {},
      searchOptions: {},
      debug: false
    }

    this.dataLoaded = false // flag to ensure data are properly loaded
    this.postsCount = 0 // keep track of posts ID, must be numeric
    this.storage = this.getLocalStorageOption()

    this.initConfig(args)
    this.triggerDataLoad()
  }

  /**
   * Apply the user configuration and initialize important variables
   * @param {Document} args
   */
  initConfig (args) {
    for (const [key, value] of Object.entries(args)) {
      this.config[key] = value
    }

    // ensure config backward compatilibity of <1.5.0
    if (!Array.isArray(this.config.inputId)) this.config.inputId = [this.config.inputId]
    if (!Array.isArray(this.config.outputId)) this.config.outputId = [this.config.outputId]

    // Inject the 'limit' arg within the final searchOptions
    this.config.searchOptions.limit = this.config.limit

    // Ensure 'updated_at' will be fetched, needed for the local storage logic
    this.originalPostsFields = this.config.postsFields
    if (!this.config.postsFields.includes('updated_at')) {
      this.config.postsFields.push('updated_at')
    }

    if (this.config.inputId && this.config.inputId.length > 0) {
      this.searchBarEls = []
      this.config.inputId.forEach(id => {
        const searchBar = document.getElementById(id)
        if (searchBar) {
          this.searchBarEls.push(searchBar)
          this.addSearchListeners(searchBar)
        } else {
          this.error(`Enable to find the input element #${id}, please check your configuration`)
        }
      })
    }

    if (this.config.outputId && this.config.outputId.length > 0) {
      this.searchResultEls = []
      this.config.outputId.forEach(id => {
        const searchResult = document.getElementById(id)
        if (searchResult) {
          this.searchResultEls.push(searchResult)
        } else {
          this.error(`Enable to find the output element #${id}, please check your configuration`)
        }
      })
    }

    this.index = this.getNewSearchIndex()
  }

  /**
   * Set the search input bar and form event listeners to trigger
   * further searches
   */
  addSearchListeners (searchBarEl) {
    // In any case, prevent the input form from being submitted
    const searchForm = searchBarEl.closest('form')

    if (searchForm) {
      searchForm.addEventListener('submit', (ev) => {
        ev.preventDefault()
      })
    }

    switch (this.config.searchOn) {
      case 'keyup':
        searchBarEl.addEventListener('keyup', () => {
          const inputQuery = searchBarEl.value.toLowerCase()
          this.search(inputQuery)
        })
        break
      case 'submit':
        searchForm.addEventListener('submit', () => {
          const inputQuery = searchBarEl.value.toLowerCase()
          this.search(inputQuery)
        })
        break
      case false:
      case 'none':
        // do nothing
        break
      default:
        this.error(`Unknown 'searchOn' option: '${this.config.searchOn}'`)
    }
  }

  /**
   * Set triggers to load the posts data when ready
   */
  triggerDataLoad () {
    switch (this.config.loadOn) {
      case 'focus':
        this.searchBarEls.forEach(searchBarEl => {
          searchBarEl.addEventListener('focus', () => {
            this.loadData()
          })
        })
        break
      case 'page':
        window.addEventListener('load', () => {
          this.loadData()
        })
        break
      case false:
      case 'none':
        // do nothing
        break
      default:
        this.error(`Unknown 'loadOn' option: '${this.config.loadOn}'`)
    }
  }

  /**
   * Actually load the data into a searchable index.
   * When this method is completed, we are ready to launch search queries.
   */
  loadData () {
    if (this.dataLoaded) return

    if (!this.storage) {
      this.log('No local storage available, switch to degraded mode')
      this.fetch()
      return
    }

    const storedIndex = this.storage.getItem('SearchinGhost_index')
    if (storedIndex) {
      this.log('Found an index stored locally, loads it')
      this.config.onIndexBuildStart()
      this.index.import(storedIndex)
      this.dataLoaded = true
      this.config.onIndexBuildEnd(this.index)
      this.validateCache()
    } else {
      this.log('No already stored index found')
      this.fetch()
    }
  }

  /**
   * Ensure stored data are up to date.
   */
  validateCache () {
    const cacheInfoString = this.storage.getItem('SearchinGhost_cache_info')
    if (!cacheInfoString) {
      this.log('No cache info local object found')
      this.fetch()
      return
    }

    const cacheInfo = JSON.parse(cacheInfoString)

    const lastUpdate = new Date(cacheInfo.lastCacheCheck)
    const elapsedTime = Math.round((new Date() - lastUpdate) / 1000)
    if (elapsedTime < this.config.cacheMaxAge) {
      this.log(`Skip cache refreshing, updated less than ${this.config.cacheMaxAge}s ago (${elapsedTime}s)`)
      return
    }

    const browseOptions = {
      limit: 1,
      fields: ['updated_at'],
      order: 'updated_at DESC'
    }
    const lastUpdatedPostUrl = this.buildUrl(browseOptions)

    fetch(lastUpdatedPostUrl)
      .then(function (response) {
        return response.json()
      })
      .then((jsonResponse) => {
        const lastestPostUpdatedAt = jsonResponse.posts[0].updated_at
        const totalPosts = jsonResponse.meta.pagination.total

        if (lastestPostUpdatedAt !== cacheInfo.lastestPostUpdatedAt) {
          this.log('Posts update found, purge outdated local cache')
          this.fetch()
        } else if (totalPosts < cacheInfo.totalPosts) {
          this.log('Deleted or unpublished posts found, purge outdated local cache')
          this.fetch()
        } else {
          this.log('Local cached data up to date')
          cacheInfo.lastCacheCheck = new Date().toISOString()
          this.storage.setItem('SearchinGhost_cache_info', JSON.stringify(cacheInfo))
        }
      }).catch((error) => {
        console.error('Unable to fetch the latest post information to check cache state', error)
      })
  }

  /**
   * Fetch, format and store posts data from Ghost.
   */
  fetch () {
    this.log('Fetching data from Ghost API')
    this.config.onFetchStart()

    const browseOptions = {
      limit: 'all',
      fields: this.config.postsFields,
      order: 'updated_at DESC'
    }
    if (this.config.postsExtraFields.length > 0) browseOptions.include = this.config.postsExtraFields
    if (this.config.postsFormats.length > 0) browseOptions.formats = this.config.postsFormats

    const allPostsUrl = this.buildUrl(browseOptions)

    fetch(allPostsUrl)
      .then(function (response) {
        return response.json()
      })
      .then((jsonResponse) => {
        const posts = jsonResponse.posts
        this.config.onFetchEnd(posts)
        this.config.onIndexBuildStart()

        this.index = this.getNewSearchIndex()
        posts.forEach((post) => {
          const formattedPost = this.format(post)
          if (formattedPost) this.index.add(formattedPost)
        })

        this.dataLoaded = true
        this.config.onIndexBuildEnd(this.index)

        if (this.storage) {
          const cacheInfo = {
            lastCacheCheck: new Date().toISOString(),
            lastestPostUpdatedAt: posts[0].updated_at,
            totalPosts: jsonResponse.meta.pagination.total
          }
          this.storage.setItem('SearchinGhost_index', this.index.export())
          this.storage.setItem('SearchinGhost_cache_info', JSON.stringify(cacheInfo))
        }

        this.log('Search index build complete')
      })
      .catch((error) => {
        this.error('Unable to fetch Ghost data.\n', error)
      })
  }

  /**
   * Format a post document before being indexed.
   * @param {Document} post
   * @return {Document} The formatted post
   */
  format (post) {
    // Need to use a numeric ID to improve performance & disk space
    post.id = this.postsCount++

    // display date using 'locale' format
    post.published_at = this.prettyDate(post.published_at)

    // only used to keep track of the last fetch time,
    // remove it before indexing BUT only if not wanted by the user
    if (!this.originalPostsFields.includes('updated_at')) {
      delete post.updated_at
    }

    if (post.custom_excerpt) {
      post.excerpt = post.custom_excerpt
      delete post.custom_excerpt
    }

    post = this.config.customProcessing(post)

    return post
  }

  /**
   * Execute a search query.
   * @param {string} inputQuery
   */
  search (inputQuery) {
    this.loadData()

    this.config.onSearchStart()

    const postsFound = this.index.search(inputQuery, this.config.searchOptions)

    if (this.searchResultEls && this.searchResultEls.length > 0) this.display(postsFound)

    this.config.onSearchEnd(postsFound)
    return postsFound
  }

  /**
   * Display the results as HTML into the configured DOM output element.
   * @param {Document[]} posts
   */
  display (posts) {
    this.searchResultEls.forEach(resultEl => {
      resultEl.innerHTML = ''
    })

    if (posts.length < 1) {
      this.insertTemplate(this.config.emptyTemplate())
    } else {
      posts.forEach(post => {
        this.insertTemplate(this.config.template(post))
      })
    }
  }

  /**
   * Insert the HTML generated by the template into the DOM results output element.
   * If a falsy value is returned by the template, do not apply any update.
   * @param {*} generatedHtml HTML node element or HTML string
   */
  insertTemplate (generatedHtml) {
    if (generatedHtml) {
      this.searchResultEls.forEach(resultEl => {
        if (this.config.outputChildsType) {
          const child = document.createElement(this.config.outputChildsType)
          child.classList.add(`${resultEl.id}-item`)
          child.innerHTML = generatedHtml
          resultEl.appendChild(child)
        } else {
          resultEl.insertAdjacentHTML('beforeend', generatedHtml)
        }
      })
    }
  }

  /**
   * Get a new instance of FlexSearch.
   * @return {FlexSearch} The instance of FlexSearch.
   */
  getNewSearchIndex () {
    const indexConfig = {
      doc: {
        id: 'id',
        field: this.config.indexedFields
      },
      encode: 'simple',
      tokenize: 'forward',
      threshold: 0,
      resolution: 4,
      depth: 0
    }

    for (const [key, value] of Object.entries(this.config.indexOptions)) {
      indexConfig[key] = value
    }

    return new FlexSearch(indexConfig)
  }

  /**
   * Build the final Ghost API URL resources based on options.
   * @param {Document} options the Ghost API browse options
   * @return {string} the url
   */
  buildUrl (options) {
    let url = `${this.config.url}/ghost/api/${this.config.version}/content/posts/?key=${this.config.key}`
    for (const [key, value] of Object.entries(options)) {
      url += `&${key}=${value}`
    }
    return encodeURI(url)
  }

  /**
   * Get the date in the locale expected format.
   * @param {string} date
   * @return {string} The formatted date
   */
  prettyDate (date) {
    const d = new Date(date)
    return d.toLocaleDateString(this.config.date.locale, this.config.date.options)
  }

  /**
   * Safely get the local storage object if available.
   * If the user browser disabled it, get `undefined` instead.
   * @return {Storage} The storage object or `undefined`
   */
  getLocalStorageOption () {
    try {
      window.localStorage.setItem('storage-availability-test', '')
      window.localStorage.removeItem('storage-availability-test')
      return window.localStorage
    } catch (err) {
      return undefined
    }
  }

  /**
   * Simple logging function.
   * Output logs only if `debug` is set to `true`.
   * @param {string} str the text to output
   * @param {*} obj optional object to output
   */
  log (str, obj) {
    if (this.config.debug) obj ? console.log(str, obj) : console.log(str)
  }

  /**
   * Simple 'error' level logging function.
   * @param {string} str the text to output
   * @param {*} obj optional object to output
   */
  error (str, obj) {
    obj ? console.error(str, obj) : console.error(str)
  }
}
