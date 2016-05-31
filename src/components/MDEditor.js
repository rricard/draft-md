/* @flow */

import React, {
  Component,
  PropTypes,
} from "react"
import {
  Editor,
  EditorState,
  ContentState,
} from "draft-js"

export class MDEditor extends Component {
  props: MDEditorProps;
  state: MDEditorState;

  constructor(props: MDEditorProps) {
    super(props)
    const {initialValue} = props

    this.state = {
      editorState: initialValue ?
        EditorState.createWithContent(
          ContentState.createFromText(initialValue)
        ) :
        EditorState.createEmpty(),
    }
  }

  render(): React.Element {
    const {style, spellCheck} = this.props
    const {editorState} = this.state
    return (
      <div style={style} onClick={() => this.handleFocus()}>
        <Editor
          editorState={editorState}
          onChange={es => this.handleChange(es)}
          spellCheck={spellCheck}
          ref="editor"
          />
      </div>
    )
  }

  handleFocus() {
    this.refs.editor.focus()
  }

  handleChange(editorState: EditorState) {
    const {onChange} = this.props
    this.setState({editorState})
    if(onChange) {
      onChange(
        editorState.getCurrentContent().getBlocksAsArray()
        .map(block => block.getText()).join('\n')
      )
    }
  }

  static propTypes = {
    initialValue: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object,
    spellCheck: PropTypes.bool,
  }
}

export type MDEditorProps = {
  initialValue?: string,
  onChange?: (value: string) => void,
  style?: {[cssProp: string]: mixed},
  spellCheck?: boolean,
}

type MDEditorState = {
  editorState: EditorState,
}
