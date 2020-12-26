import getAll from './get-all'

export default (dropdownsBoxs) => {
  const dropdowns = getAll(dropdownsBoxs)

  if (!dropdowns.length) return

  dropdowns.forEach(function (el) {
    el.addEventListener('click', function (event) {
      event.stopPropagation()
      el.classList.toggle('is-active')
      document.body.classList.remove('has-menu')
    })
  })

  const closeDropdowns = () => dropdowns.forEach(function (el) {
    el.classList.remove('is-active')
  })

  document.addEventListener('click', closeDropdowns)
}
