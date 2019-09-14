/* global sitePrismJscomponents Prism */
import 'prismjs'
import 'prismjs/plugins/autoloader/prism-autoloader'

if (typeof sitePrismJscomponents !== 'undefined') {
  Prism.plugins.autoloader.languages_path = sitePrismJscomponents
}
