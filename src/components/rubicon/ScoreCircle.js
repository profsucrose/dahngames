import React from 'react'

const ScoreCircle = props => {
	return (
		<div className={`circle ${props.type}`}>{props.value}</div>
	)
}

export default ScoreCircle