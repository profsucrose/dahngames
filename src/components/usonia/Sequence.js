import React from 'react'

const turnToClass = (num, turn) => {
	return num === turn ? 'current-turn' : ''
}

const Sequence = props => {
	return (
		<div className="sequence">
			<div className={`seq-item ${turnToClass(props.turn, 0)}`}>
				{props.first}
			</div>
			<div className={`seq-item ${turnToClass(props.turn, 1)}`}>
				{props.second}
			</div>
			<div className={`seq-item ${turnToClass(props.turn, 2)}`}>
				{props.third}
			</div>
		</div>
	)
}

export default Sequence