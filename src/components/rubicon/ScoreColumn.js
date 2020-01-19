import React from 'react'
import ContentEditable from 'react-contenteditable'
import Value from './Value'

class ScoreColumn extends React.Component {
	render() {
		return (
			<div className="score-column">
				<ContentEditable
					data-placeholder={this.props.type.toUpperCase()}
					html={this.props.player.toUpperCase()}
					onChange={e => this.props.onChange(e, this.props.type, this.props.player, true)}
					className="player-name"
					style={{
						borderColor: this.props.type,
						borderBottomStyle: "solid"
					}}
				/>
				<Value onChange={this.props.onChange} player={this.props.type} type="win" value={this.props.scores.win} />
				<Value onChange={this.props.onChange} player={this.props.type} type="red" value={this.props.scores.red} />
				<Value onChange={this.props.onChange} player={this.props.type} type="gray" value={this.props.scores.gray} />
				<Value onChange={this.props.onChange} player={this.props.type} type="yellow" value={this.props.scores.yellow} />
				<Value onChange={this.props.onChange} player={this.props.type} type="blue" value={this.props.scores.blue} />
			</div>
		)
	}
}

export default ScoreColumn