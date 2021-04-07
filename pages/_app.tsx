import React from 'react'

import '../styles/globals.css'
import 'react-notion-x/src/styles.css'

import 'rc-dropdown/assets/index.css'
import 'katex/dist/katex.min.css'

import 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/themes/prism-tomorrow.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
