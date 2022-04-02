import InfiniteScroll from 'infinite-scroll'

(function (document) {
  // Next link Element
  const nextElement = document.querySelector('link[rel=next]')
  if (!nextElement) return

  // Post Feed element
  const $feedElement = document.querySelector('.js-feed-entry')
  if (!$feedElement) return

  const $viewMoreButton = document.querySelector('.load-more-btn')
  // const $iconLoader = $viewMoreButton.querySelector('.icon')
  // const $label = $viewMoreButton.querySelector('.label')

  const infScroll = new InfiniteScroll($feedElement, {
    append: '.js-story',
    button: $viewMoreButton,
    history: false,
    debug: false,
    hideNav: '.pagination',
    path: '.pagination .older-posts'
  })

  infScroll.on('load', onPageLoad)

  function onPageLoad () {
    if (infScroll.loadCount === 1) {
      // after 3nd page loaded
      // disable loading on scroll
      infScroll.options.loadOnScroll = false
      // show button
      $viewMoreButton.classList.add('flex')
      $viewMoreButton.classList.remove('hidden')
      // remove event listener
      infScroll.off(onPageLoad)
    }
  }

  // infScroll.on('request', function () {
  //   $label.classList.add('hidden')
  //   $iconLoader.classList.remove('hidden')
  // })

  // infScroll.on('append', function () {
  //   $label.classList.remove('hidden')
  //   $iconLoader.classList.add('hidden')
  // })

  $viewMoreButton.addEventListener('click', function () {
    // load next page
    infScroll.loadNextPage()
    // enable loading on scroll
    infScroll.options.loadOnScroll = true
    // hide page
    this.classList.add('hidden')
  })
})(document)
