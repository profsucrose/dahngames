import React from 'react'
import RubiconLogo from '../../static/rubicon/title.png'

import '../../css/rubiconhome.css'

const RubiconHome = () => {
	return (
		<div className="container">
			<img src={RubiconLogo} alt="Rubicon Title Logo" />
			<h2>BY JOSHUA DAHN</h2>
			<div className="instructions">
				<p>Players alternative filling in empty circles</p>
				<p>When players move two (2) or three
	(3) times consecutively, they must
	move to a space connected to an
existing space or a gold space</p>
				<p>First round is one move each</p>
				<p>Gold spaces can be used by either
team</p>
				<p>Circles must connect paths across
	the Rubicon unbroken to score
points (color + color)</p>
				<p>Most points wins after no more
paths can be made</p>
				<p>Multiple paths can start from the
	same color, but the points for that
	circle will only count once (an easy
	question to ask is “does this space
	cross the Rubicon and connect to
	the other side?” If yes, count the
points for that space.</p>
			</div>
			<div className="virtual-instructions">
				<h4>You can create a game by going to <a>dahn-games.web.app/rubicon/{"<your_game_name>"}</a> and sending that link to your opponent.
				</h4>
				<h4>Click on the map to make moves and on the values in the bottom-left box to keep score and player names.</h4>
				<h4>Have fun!</h4>
			</div>
		</div>
	)
}

export default RubiconHome