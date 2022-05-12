/* global searchSettings */

import SearchinGhost from './lib/searchinghost'

(function (document) {
  const $body = document.body
  const $input = document.querySelector('#search-field')
  const $results = document.querySelector('#search-results')
  const $searchMessage = document.querySelector('.js-search-message')

  const classIsActive = 'is-active'

  let allSearchLinksLength = 0

  let searchResultsHeight = {
    outer: 0,
    scroll: 0
  }

  // SHow icon search in header
  document.querySelector('a[data-target=modal-search]').classList.remove('hidden')

  const afterDisplaySearch = results => {
    // Active class to link search
    searchResultActive()

    allSearchLinksLength = results.length

    searchResultsHeight = {
      outer: $results.offsetHeight,
      scroll: $results.scrollHeight
    }

    if (allSearchLinksLength === 0 && $input.value !== '') {
      $searchMessage.classList.remove('hidden')
      $body.removeEventListener('keydown', mySearchKey)
    } else {
      $searchMessage.classList.add('hidden')
      $body.addEventListener('keydown', mySearchKey)
    }
  }

  /* Customized search data
  /* ---------------------------------------------------------- */

  const mySearchSettings = {
    // key: searchSettings.key,
    onSearchEnd: results => afterDisplaySearch(results)
  }

  // join user settings
  Object.assign(mySearchSettings, searchSettings)

  /* when the Enter key is pressed
  /* ---------------------------------------------------------- */
  function enterKey () {
    const link = $results.querySelector(`li.${classIsActive}`)
    link && link.firstChild.click()
  }

  /* Attending the active class to the search link
  /* ---------------------------------------------------------- */
  function searchResultActive (index, upDown) {
    index = index || 0
    upDown = upDown || 'up'

    const allSearchLinks = $results.querySelectorAll('li')

    // Return if there are no results
    if (!allSearchLinks.length) return

    // Remove All class Active
    allSearchLinks.forEach(element => element.classList.remove(classIsActive))

    // Add class active
    allSearchLinks[index].classList.add(classIsActive)

    // Scroll for results box
    const linkOffSetTop = allSearchLinks[index].offsetTop
    let scrollPosition = 0

    upDown === 'down' && linkOffSetTop > searchResultsHeight.outer / 2 ? scrollPosition = linkOffSetTop - searchResultsHeight.outer / 2 : upDown === 'up' && (scrollPosition = linkOffSetTop < searchResultsHeight.scroll - searchResultsHeight.outer / 2 ? linkOffSetTop - searchResultsHeight.outer / 2 : searchResultsHeight.scroll)

    $results.scrollTo(0, scrollPosition)
  }

  /* Reacted to the up or down keys
  /* ---------------------------------------------------------- */
  function arrowKeyUpDown (keyNumber) {
    let upDown
    let indexTheLink = 0

    const resultActive = $results.querySelector(`li.${classIsActive}`)

    if (resultActive) {
      indexTheLink = [].slice.call(resultActive.parentNode.children).indexOf(resultActive)
    }

    $input.blur()

    // 38 === UP
    if (keyNumber === 38) {
      upDown = 'up'

      if (indexTheLink <= 0) {
        $input.focus()
        indexTheLink = 0
      } else {
        indexTheLink -= 1
      }
    } else {
      upDown = 'down'

      if (indexTheLink >= allSearchLinksLength - 1) {
        indexTheLink = 0
      } else {
        indexTheLink += 1
      }
    }

    searchResultActive(indexTheLink, upDown)
  }

  /* Adding functions to the keys
  /* ---------------------------------------------------------- */
  function mySearchKey (e) {
    const keyNumber = e.keyCode

    /**
      * 38 => Up
      * 40 => down
      * 13 => enter
      **/

    if (keyNumber === 13) {
      $input.blur()
      enterKey()
    } else if (keyNumber === 38 || keyNumber === 40) {
      arrowKeyUpDown(keyNumber)
      e.preventDefault()
    }
  }

  /* Search
  /* ---------------------------------------------------------- */
  /* eslint-disable no-new */
  new SearchinGhost(mySearchSettings)
})(document)
