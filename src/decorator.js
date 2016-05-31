/* @flow */
/* eslint react/display-name: 0, react/prop-types: 0 */

import React from "react"
import {
  CompositeDecorator,
} from "draft-js"

function blockRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText()
  if(regex.test(text)) {
    callback(0, text.length)
  }
}

function inlineRegex(regex, contentBlock, callback) {
  let text = contentBlock.getText()
  let matchArr, start
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index
    callback(start, start + matchArr[0].length)
    text = text.slice(start + matchArr[0].length)
  }
}

const URL_REGEX =
  /\w+:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g

export default new CompositeDecorator([
  {
    strategy: (cBlock, cb) => blockRegex(/^\# .+$/, cBlock, cb),
    component: (props) => <h1 {...props}>{props.children}</h1>,
  },
  {
    strategy: (cBlock, cb) => blockRegex(/^\#\# .+$/, cBlock, cb),
    component: (props) => <h2 {...props}>{props.children}</h2>,
  },
  {
    strategy: (cBlock, cb) => blockRegex(/^\#\#\# .+$/, cBlock, cb),
    component: (props) => <h3 {...props}>{props.children}</h3>,
  },
  {
    strategy: (cBlock, cb) => blockRegex(/^\#\#\#\# .+$/, cBlock, cb),
    component: (props) => <h4 {...props}>{props.children}</h4>,
  },
  {
    strategy: (cBlock, cb) => blockRegex(/^\#\#\#\#\# .+$/, cBlock, cb),
    component: (props) => <h5 {...props}>{props.children}</h5>,
  },
  {
    strategy: (cBlock, cb) => blockRegex(/^\#\#\#\#\#\# .+$/, cBlock, cb),
    component: (props) => <h6 {...props}>{props.children}</h6>,
  },
  {
    strategy: (cBlock, cb) => blockRegex(/^(\t| {4}).+$/g, cBlock, cb),
    component: (props) => <pre {...props}>{props.children}</pre>,
  },
  {
    strategy: (cBlock, cb) => inlineRegex(/\*\*[^\*]+\*\*/g, cBlock, cb),
    component: (props) => <strong {...props}>{props.children}</strong>,
  },
  {
    strategy: (cBlock, cb) => inlineRegex(/\_\_[^\_]+\_\_/g, cBlock, cb),
    component: (props) => <strong {...props}>{props.children}</strong>,
  },
  {
    strategy: (cBlock, cb) => inlineRegex(/\*[^\*]+\*/g, cBlock, cb),
    component: (props) => <em {...props}>{props.children}</em>,
  },
  {
    strategy: (cBlock, cb) => inlineRegex(/\_[^\_]+\_/g, cBlock, cb),
    component: (props) => <em {...props}>{props.children}</em>,
  },
  {
    strategy: (cBlock, cb) => inlineRegex(/\`[^\`]+\`/g, cBlock, cb),
    component: (props) => <code {...props}>{props.children}</code>,
  },
  {
    strategy: (cBlock, cb) => inlineRegex(URL_REGEX, cBlock, cb),
    component: (props) =>
      <a href={props.decoratedText} {...props}>
        {props.children}
      </a>,
  },
])
