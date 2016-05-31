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
    const {editorState} = this.state
    return (
      <div>
        <Editor
          editorState={editorState}
          onChange={es => this.handleChange(es)}
          />
      </div>
    )
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
  }
}

export type MDEditorProps = {
  initialValue?: string,
  onChange?: (value: string) => void,
}

type MDEditorState = {
  editorState: EditorState,
}
