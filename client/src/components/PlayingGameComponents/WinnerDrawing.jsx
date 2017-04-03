'use strict';
import React from 'react';
import WinnerDrawingEntry from './WinnerDrawingEntry.jsx'
import { ListGroup, ListGroupItem, Col, Button } from 'react-bootstrap';

class WinnerDrawing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      readyToMoveOn: false
    }
  }

  render() {

    const results = (
      <ListGroup id="winner">
        <h4>Results</h4>
        {this.props.responses.map((response) => (
          <WinnerDrawingEntry response={response} winner={this.props.winner} />
        ))}
          <br />
      </ListGroup>
    )

    const confirmation = <p><b>Hold tight - the next round will begin as soon as all players are ready to move on!</b></p>
    
    const moveOnButton = (
        <Button onClick={() => {
            this.setState({readyToMoveOn: true})
            this.props.handleReadyToMoveOn();
          }
        }>I'm Ready to Move On!</Button>
    )

    return (
      <Col>
        {results}
        {!this.state.readyToMoveOn && moveOnButton}
        {this.state.readyToMoveOn && confirmation}
      </Col>
    )
    
  }
}





export default WinnerDrawing