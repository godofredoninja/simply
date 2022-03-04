((window, document) => {
  // Next link Element
  const nextElement = document.querySelector('link[rel=next]')
  if (!nextElement) return

  // Post Feed element
  const feedElement = document.querySelector('.js-feed-entry')
  if (!feedElement) return

  const $buttonLoadMore = document.querySelector('.js-load-more')

  const buffer = 300

  let ticking = false
  let loading = false

  let stopInfiniteScroll = false
  let pageCurrent = 1

  let lastScrollY = window.scrollY
  let lastWindowHeight = window.innerHeight
  let lastDocumentHeight = document.documentElement.scrollHeight

  function onPageLoad () {
    if (this.status === 404) {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      return
    }

    // append contents
    const postElements = this.response.querySelectorAll('.js-story')

    postElements.forEach(function (item) {
      feedElement.appendChild(document.importNode(item, true))
    })

    // feedElement.appendChild(postElements)

    // push state
    // window.history.pushState(null, document.title, nextElement.href)

    // Change Title
    // document.title = this.response.title

    // set next link
    const resNextElement = this.response.querySelector('link[rel=next]')

    if (pageCurrent === 2) {
      stopInfiniteScroll = true
    }

    if (resNextElement) {
      nextElement.href = resNextElement.href
      pageCurrent++
    } else {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }

    // sync status
    lastDocumentHeight = document.documentElement.scrollHeight
    ticking = false
    loading = false
  }

  function onUpdate () {
    // Retur if already loading
    if (loading) return

    // return if not scroll to the bottom
    if (lastScrollY + lastWindowHeight <= lastDocumentHeight - buffer) {
      ticking = false
      return
    }

    loading = true

    const xhr = new window.XMLHttpRequest()
    xhr.responseType = 'document'

    xhr.addEventListener('load', onPageLoad)

    xhr.open('GET', nextElement.href)
    xhr.send(null)
  }

  function requestTick () {
    if (stopInfiniteScroll) {
      $buttonLoadMore.classList.remove('hidden')

      return false
    }

    ticking || window.requestAnimationFrame(onUpdate)
    ticking = true
  }

  function onScroll () {
    lastScrollY = window.scrollY
    requestTick()
  }

  function onResize () {
    lastWindowHeight = window.innerHeight
    lastDocumentHeight = document.documentElement.scrollHeight
    requestTick()
  }

  $buttonLoadMore.addEventListener('click', function () {
    stopInfiniteScroll = false
    this.classList.add('hidden')
    this.querySelector('.label').classList.add('hidden')
    this.querySelector('.button-loader').classList.remove('hidden')
    requestTick()
  })

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)

  requestTick()
})(window, document)
