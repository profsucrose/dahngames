import React from 'react'

const FillInBox = props => {
	return (
		<div className="fill-in-select-container">
			<div className="fill-in-box">
				<div className="triangle basic" onClick={() => props.onFillIn("triangle")}></div>
				<div className="square red" onClick={() => props.onFillIn("square")}></div>
			</div>
			<button className="ui icon button" onClick={props.rotateFillIn}>
				<i className="icon redo"></i>
			</button>
		</div>
	)
}

export default FillInBox