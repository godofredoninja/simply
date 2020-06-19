/* global prismJsComponents */

// https://ghost.org/tutorials/code-syntax-highlighting/
// https://cdnjs.com/libraries/prism/

import Prism from 'prismjs'
import 'prismjs/plugins/autoloader/prism-autoloader'

(prism => {
  prism.highlightAll()

  if (typeof prismJsComponents === 'undefined') return

  prism.plugins.autoloader.languages_path = prismJsComponents
})(Prism)
