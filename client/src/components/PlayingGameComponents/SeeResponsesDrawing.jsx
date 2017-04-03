'use strict';
import React from 'react';
import PlayerResponseEntry from './PlayerResponseEntry.jsx'
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap';

const SeeResponsesDrawing = (props) => (
  <ListGroup id="see-responses">
    <h4>Responses</h4>
    {props.responses.map((response) => (
      <PlayerResponseEntry prompt={props.prompt} response={response} />
    ))}
  </ListGroup>
)


export default SeeResponsesDrawing

// responsep1 is the person