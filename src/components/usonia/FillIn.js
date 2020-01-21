import React from 'react'

const FillIn = props => {
	return (
		<div
			className={`${props.fillIn.shape} hide-cursor fit-map-tile`}
			style={{
				top: props.y,
				left: props.x,
				backgroundColor: props.color,
				position: "absolute",
				transform: `rotate(${props.fillIn.rot90 % 4 * 90}deg)`
			}}
		></div>
	)
}

export default FillIn