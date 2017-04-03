'use strict';
import React from 'react';
import DrawingEntry from './DrawingEntry.jsx';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap';

const ChooseWinnerDrawing = (props) => (
  <ListGroup id="choose-winner-drawing">
    <h4>Responses</h4>
    {props.responses.map((response) => (
        <DrawingEntry prompt={props.prompt} response={response} handleJudgeSelection={props.handleJudgeSelection} />
    ))}
  </ListGroup>
)


export default ChooseWinnerDrawing;