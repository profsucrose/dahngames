import React from 'react'

class Point extends React.Component {
	render() {
		return (
			<div
				className="point"
				style={{
					backgroundColor: this.props.color,
					top: this.props.y,
					left: this.props.x,
					position: "absolute"
				}}
				key={Math.random()}
			/>
		)
	}
}

export default Point