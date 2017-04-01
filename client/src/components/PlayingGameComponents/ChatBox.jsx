'use strict';
import React from 'react';
import { Col, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
var Filter = require('bad-words');
var filter = new Filter();

class ChatBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chat: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    var filteredChat = filter.clean(event.target.value)
    this.setState({chat: filteredChat });
  }

  render() {

    const chatForm = (
      <Form inline>
        <FormGroup controlId="formInlineResponse">
          <FormControl id="chatInput" type="text" placeholder="Say something nice..." onChange={this.handleInputChange} value={this.state.chat}/>
        </FormGroup>
        {' '}
        <Button id="submitChat" onClick={(event) => {
            event.preventDefault();
            //if event not enter keypress
            if(event.which !== 13) {
            this.props.handleChatSubmission(this.state.chat);
            this.state.chat = '';
            setTimeout(function() {
              this.refs.chat.scrollTop = this.refs.chat.scrollHeight;
            }.bind(this), 500);
          }

          }
        }>
          Submit
        </Button>
      </Form>
    )

    const chats = this.props.chats.map((chat) =>
      <div>{chat}</div>
      );



    return (
      <Col id="chat">
          <h4>Chat with your opponents!</h4>
          <div id="chatBox" ref="chat">
          {chats}
          </div>
          {chatForm}
      </Col>
    )
  }
}


export default ChatBox;