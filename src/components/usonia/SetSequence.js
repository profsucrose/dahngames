import React from 'react'
import Sequence from './Sequence'

const SetSequence = props => {
	return (
		<div className="set-sequence">
			<Sequence
				first="1"
				second="1"
				third="3"
				turn={props.turn}
				name="move-sequence"
			/>
			<Sequence
				first="2"
				second="2"
				third="1"
				turn={props.turn}
				name="move-sequence"
			/>
		</div>
	)
}

export default SetSequence