import React from 'react';
import { ListGroup, ListGroupItem, Col, Button } from 'react-bootstrap';

// const Winner = (props) => (
//   <ListGroup id="winner">
//     <h4>Results</h4>
//   	{props.responses.map((response) => (
// 			<ListGroupItem bsStyle={response[1] === props.winner ? 'success' : 'danger'}> 
// 				<b>{response[1]}:</b> {response[0]} {response[1] === props.winner && <b>(WINNER)</b> } 
// 			</ListGroupItem>
// 		))}
//       <br />
//     <Button onClick={() => {props.handleReadyToMoveOn()}}>I'm Ready to Move On!</Button>
//   </ListGroup>
// )

class Winner extends React.Component {
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
          <ListGroupItem bsStyle={response[1] === this.props.winner ? 'success' : 'danger'}> 
            <b>{response[1]}:</b> {response[0]} {response[1] === this.props.winner && <b>(WINNER)</b> } 
          </ListGroupItem>
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





export default Winner