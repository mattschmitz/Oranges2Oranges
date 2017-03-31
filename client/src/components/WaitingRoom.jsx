'use strict';
import React from 'react';
import Rules from './Rules.jsx';
import ChatBox from './PlayingGameComponents/ChatBox.jsx';
import { Col, PageHeader, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

const WaitingRoom = (props) => {
  return (
    <Col id='waiting-room'>
      <PageHeader>{props.game.gameName} <small>Waiting Room</small></PageHeader>
      <h3>Number of Players: {props.game.players.length}</h3>
      <br />
      <h4>Current Players:</h4>
      <Col sm={4} smOffset={4}>
        <ListGroup>
          {props.game.players.map( (player) => <ListGroupItem>{player}</ListGroupItem>)}
        </ListGroup>
      </Col>
      <Col sm={6} smOffset={3}>
        {props.game.host === props.user && <Button onClick={props.startgame}>Start Game!</Button>}
        <Rules/>
        <ChatBox chats = {props.chats} handleChatSubmission = {props.handleChatSubmission}/>
      </Col>
      
    </Col>
    

  )
}

export default WaitingRoom;


