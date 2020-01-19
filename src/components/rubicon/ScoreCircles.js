import React from 'react'
import ScoreCircle from './ScoreCircle'

const ScoreColumn = () => {
	return (
		<div className="score-column">
			<ScoreCircle type="win" value="win" />
			<ScoreCircle type="red" value="1" />
			<ScoreCircle type="gray" value="3" />
			<ScoreCircle type="yellow" value="5" />
			<ScoreCircle type="blue" value="9" />
		</div>
	)
}

export default ScoreColumn