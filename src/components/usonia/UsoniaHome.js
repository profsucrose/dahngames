import React from 'react'
import UsoniaLogo from '../../static/usonia/title.png'

import '../../css/rubiconhome.css'

const UsoniaHome = () => {
	return (
		<div className="container">
			<img src={UsoniaLogo} alt="Usonia Title Logo" style={{ width: "230px" }} />
			<h2>BY JOSHUA DAHN</h2>
			<div className="instructions">
				<p>There are 121 spaces</p>
				<p>The team with the most points wins</p>
				<p>Three vertices of a triangle is worth one (1) point</p>
				<p>Three vertices of a yellow triangle is worth three (3) points</p>
				<p>Four vertices of red squares are worth four (4) points</p>
				<p>All five vertices of the center diamond wins the game</p>
				<p>Gameplay is 12 rounds of 5 moves each.</p>
				<p>Each player picks one of the two sequences for each round</p>
				<p>Players may pick different sequences</p>
				<p>Color in shapes as you complete them</p>
			</div>
			<div className="virtual-instructions">
				<h4>You can create a game by going to <a>dahn-games.web.app/usonia/{"<your_game_name>"}</a> and sending that link to your opponent.
				</h4>
				<h4>Click on the map to make moves and on the values in the top-right box to keep score and player names.</h4>
				<h4>Have fun!</h4>
			</div>
		</div>
	)
}

export default UsoniaHome