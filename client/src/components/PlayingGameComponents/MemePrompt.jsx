'use strict';
import React from 'react';
import { Col, Panel } from 'react-bootstrap';

const MemePrompt = (props) => (
  <Col id="meme-prompt">
    <Panel>
      <b>Meme: </b> <img src={props.prompt} />
    </Panel>
    <br />
  </Col>
)


export default MemePrompt;