'use strict';
import React from 'react';
import { Col, Panel } from 'react-bootstrap';

class DrawMemePrompt extends React.Component {
  constructor(props) {
    super(props)
    
  }

  componentDidMount () {
    let img = this.refs.image
    img.onload = function () {
      const editor = Raphael.sketchpad("editor", {
        width: img.width,
        height: img.height,
        editing: true
      });
    }
  }
  // style={{position:'absolute', left: '50%', top:'50%'}}

  render () {
    return (
      <Col id="meme-prompt">
        <Panel>
          <b>Meme: </b>
          <div id="editor-image-wrapper">
            <img ref="image" src={this.props.prompt} />
            <div id="editor" style={{position:'absolute', left: '29px', top:'40px', 'z-index':99}}></div>
          </div>
        </Panel>
        <br />
      </Col>
    )
  }
}


export default DrawMemePrompt;