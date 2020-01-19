import React from 'react'
import ScoreColumn from './ScoreColumn'
import ScoreCircles from './ScoreCircles'

class Scorebox extends React.Component {
	render() {
		return (
			<div className="scorebox">
				<ScoreColumn
					scores={this.props.blue.scores}
					player={this.props.blue.name}
					type="blue"
					onChange={this.props.onChange} />
				<ScoreCircles />
				<ScoreColumn
					scores={this.props.red.scores}
					player={this.props.red.name}
					type="red"
					onChange={this.props.onChange}
				/>
			</div>
		)
	}
}

export default Scorebox