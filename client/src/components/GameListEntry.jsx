'use strict';
import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const GameListEntry = (props) => {

  var playerList = '';

  props.game.players.forEach(function(player) {
    playerList += (player + ', ');
  })

  let promptType = props.game.category;

  return (
    <ListGroupItem header={props.name} onClick={() => props.sendToGame(props.name)}><em>Prompt Type:</em> {promptType} | <em>Current Players:</em> {playerList}</ListGroupItem>
  )
}


export default GameListEntry;