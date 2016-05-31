/* @flow */
import React from "react"
import ReactDOM from "react-dom"

import { MDEditor } from "./components/MDEditor"
import type { MDEditorProps } from "./components/MDEditor"

export { MDEditor } from "./components/MDEditor"

export function mountMDEditor(props: MDEditorProps, container: any): void {
  ReactDOM.render(<MDEditor {...props} />, container)
}
