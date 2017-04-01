'use strict';
import React from 'react';
import Prompt from './PlayingGameComponents/Prompt.jsx';
import MemePrompt from './PlayingGameComponents/MemePrompt.jsx';
import DrawMemePrompt from './PlayingGameComponents/DrawMemePrompt.jsx';
import CurrentJudge from './PlayingGameComponents/CurrentJudge.jsx';
import PlayersResponding from './PlayingGameComponents/PlayersResponding.jsx';
import SeeResponses from './PlayingGameComponents/SeeResponses.jsx';
import Winner from './PlayingGameComponents/Winner.jsx'
import RespondToPrompt from './PlayingGameComponents/RespondToPrompt.jsx';
import ChooseWinner from './PlayingGameComponents/ChooseWinner.jsx';
import Score from './PlayingGameComponents/Score.jsx';
import CreatePrompt from './PlayingGameComponents/CreatePrompt.jsx';
import JudgeCreatingPrompt from './PlayingGameComponents/JudgeCreatingPrompt.jsx';
import ChatBox from './PlayingGameComponents/ChatBox.jsx';
import { Col, PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';


class PlayingGame extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      role: null // can either be judge or player
    };

    this.getRole = this.getRole.bind(this);
  }

  componentDidMount() {
    this.getRole();
  }

  componentWillReceiveProps(nextProps) {
    this.getRole(nextProps);
  }

  getRole(nextProps) {

    if (nextProps) {
      let curRound = nextProps.game.currentRound;
      let numPlayers = nextProps.game.players.length;
      let index = curRound % numPlayers;
      
      if (nextProps.game.players[index] === nextProps.user) {
        this.setState({role: 'judge'})
      } else {
        this.setState({role: 'player'})
      }
    } else {
      let curRound = this.props.game.currentRound;
      let numPlayers = this.props.game.players.length;
      let index = curRound % numPlayers;

      if (this.props.game.players[curRound] === this.props.user) {
        this.setState({role: 'judge'})
      } else {
        this.setState({role: 'player'})
      }
    }
  }

  render() {
    var curRound = this.props.game.currentRound;
    var curPrompt = this.props.game.rounds[curRound].prompt;
    var numPlayers = this.props.game.players.length;
    var index = curRound % numPlayers;
    var curJudge = this.props.game.players[index];
    var category = this.props.game.category;
    var stage = this.props.game.rounds[curRound].stage;
    var responses = this.props.game.rounds[curRound].responses;
    var winner = this.props.game.rounds[curRound].winner;

    return (
      <div >
      <div id="playing-game">
        <PageHeader>{this.props.game.gameName}: <small>Round {this.props.game.currentRound + 1} - Judge: {curJudge}</small></PageHeader>
          <Col sm={6} smOffset={3}>
            <h4>Scoreboard</h4>
            <Score game={this.props.game}/>
          </Col>
          <Col sm={6} smOffset={3}>
            {stage !== -1 && category === 'random' && <Prompt prompt={curPrompt}/>}        
            {stage !== -1 && category === 'memes' && <MemePrompt prompt={curPrompt}/>}
            {stage !== -1 && category === 'drawing' && <DrawMemePrompt prompt={curPrompt}/>}
          </Col>
        <Col sm={6} smOffset={3}>
        {stage === -1 && this.state.role === 'judge' && <CreatePrompt handlePromptSubmission={this.props.handlePromptSubmission}/>}
        {stage === -1 && this.state.role === 'player' && <JudgeCreatingPrompt judge={curJudge}/>}
        {stage === 0 && this.state.role === 'judge' && <PlayersResponding />}
        {stage === 0 && this.state.role === 'player' && <RespondToPrompt handleResponse={this.props.handleResponse}/>}
        {stage === 1 && this.state.role === 'judge' && <ChooseWinner responses={responses} handleJudgeSelection={this.props.handleJudgeSelection}/>}
        {stage === 1 && this.state.role === 'player' && <SeeResponses responses={responses}/>}
        {stage === 2 && <Winner responses={responses} winner={winner} handleReadyToMoveOn={this.props.handleReadyToMoveOn}/>}
        </Col>
      </div>
      <div id="game-chat">
          <ChatBox chats = {this.props.chats} handleChatSubmission = {this.props.handleChatSubmission} />
        </div>
        </div>
    )
  }
}

export default PlayingGame;