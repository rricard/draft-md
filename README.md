# DraftMD

React/Draft.js-based Markdown editor inspired by iA Writer

## Installation

    npm install draft-md

or consume the bundled file in the `dist/` directory

## Usage

### Using React

If you use react already, it's very straightforward:

    import {MDEditor} from "draft-md"
    import React from "react"
    import ReactDOM from "react-dom"
    ReactDOM.render(
      <MDEditor initialValue="# Hello!" onChange={console.log} />,
      document.getElementById("editor")
    )

### Without React - Global object in Bundle

    DraftMD.mountMDEditor(
      {initialValue: "# Hello!"},
      document.getElementById("editor")
    )
