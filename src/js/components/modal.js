// Moodal

import getAll from '../app/get-all'

export default (modal, modalButton, modalClose, isActive) => {
  const rootEl = document.documentElement
  const $modals = getAll(modal)
  const $modalButtons = getAll(modalButton)
  const $modalCloses = getAll(modalClose)

  // Modal Click Open
  if (!$modalButtons.length) return
  $modalButtons.forEach($el => $el.addEventListener('click', () => openModal($el.dataset.target)))

  // Modal Click Close
  if (!$modalCloses.length) return
  $modalCloses.forEach(el => el.addEventListener('click', () => closeModals()))

  const openModal = target => {
    document.body.classList.remove('has-menu')
    const $target = document.getElementById(target)
    rootEl.classList.add('overflow-hidden')
    $target.classList.add(isActive)

    if (target === 'modal-search') {
      document.querySelector('#search-field').focus()
    }
  }

  const closeModals = () => {
    rootEl.classList.remove('overflow-hidden')
    $modals.forEach($el => $el.classList.remove(isActive))
  }

  document.addEventListener('keydown', function (event) {
    const e = event || window.event
    if (e.keyCode === 27) {
      closeModals()
      // closeDropdowns()
    }
  })
}
