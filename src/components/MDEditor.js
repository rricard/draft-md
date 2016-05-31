/* @flow */

import React, {
  Component,
} from "react"

export class MDEditor extends Component {
  constructor(props: MDEditorProps) {
    super(props)
  }

  render(): React.Element {
    return (
      <div>
        # Hello
        world
      </div>
    )
  }

  static propTypes: {[prop: string]: mixed} = {
  }
}

export type MDEditorProps = {
}
