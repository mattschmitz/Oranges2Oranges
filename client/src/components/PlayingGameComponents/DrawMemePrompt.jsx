'use strict';
import React from 'react';
import { Col, Panel, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class DrawMemePrompt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      response: '',
      responded: false
    }



    this.handleInputChange = this.handleInputChange.bind(this);

  }

  componentDidMount () {
    let img = this.refs.image;
    let self = this;
    img.onload = function () {
      const editor = Raphael.sketchpad("editor", {
        width: img.width,
        height: img.height,
        editing: true
      });

      editor.change(function() {
        self.setState({response: editor.json()});
      });
    }
  }

  handleInputChange(event) {
    var filteredResponse = filter.clean(event.target.value)
    this.setState({response: filteredResponse});
    editor.clear();
  }

  render () {

    const responseForm = (
      <Form inline>
        <div name="data">
          <input type="hidden" name="data" id="data" value="test" />
        </div>
        {' '}
        <Button onClick={() => {
            this.setState({responded: true});
            this.props.handleResponse(this.state.response);
          }
        }>
          Submit
        </Button>
      </Form>
    )

    return (
      <Col id="submit-response">
        <Panel>
          <b>Meme: </b>
          <div id="editor-image-wrapper">
            <img ref="image" src={this.props.prompt} />
            <div id="editor" style={{position:'absolute', left: '29px', top:'40px', 'zIndex':99}}></div>
          </div>
        </Panel>
        <br />
          <div>{!this.state.responded && this.props.role !== 'judge' && responseForm}</div>
          <div>{this.state.responded && this.props.role !== 'judge' && <p><b>Your response has been submitted!</b></p>}</div>
      </Col>
    )
  }
}


export default DrawMemePrompt;