import React from 'react'
import Value from '../Value'
import ContentEditable from 'react-contenteditable'

const Scorebox = props => {
	return (
		<div className="scorebox-usonia">
			<table className="ui celled table table-usonia">
				<thead>
					<tr className="table-header-usonia">
						<th></th>
						<th>
							<div className="player-name-container">
								<ContentEditable
									data-placeholder="BLUE"
									html={props.players.blue.name.toUpperCase()}
									onChange={e => props.onValueChange(e, "player", "blue")}
									className="player-name"
								/>
							</div>
						</th>
						<th>
							<div className="player-name-container">
								<ContentEditable
									data-placeholder="RED"
									html={props.players.red.name.toUpperCase()}
									onChange={e => props.onValueChange(e, "player", "red")}
									className="player-name"
								/>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="tr">
						<td data-label="Type">BASIC TRIANGLES (1 point)</td>
						<td data-label="Blue">
							<Value
								type="basic"
								player="blue"
								value={props.players.blue.scores.basic}
								onChange={props.onValueChange}
							/>
						</td>
						<td data-label="Red">
							<Value
								type="basic"
								player="red"
								value={props.players.red.scores.basic}
								onChange={props.onValueChange}
							/>
						</td>
					</tr>
					<tr className="tr">
						<td data-label="Type">YELLOW TRIANGLES (3 points)</td>
						<td data-label="Age">
							<Value
								type="yellow"
								player="blue"
								value={props.players.blue.scores.yellow}
								onChange={props.onValueChange}
							/>
						</td>
						<td data-label="Job">
							<Value
								type="yellow"
								player="red"
								value={props.players.red.scores.yellow}
								onChange={props.onValueChange}
							/>
						</td>
					</tr>
					<tr className="tr">
						<td data-label="Type">RED SQUARES (4 points)</td>
						<td data-label="Blue">
							<Value
								type="red"
								player="red"
								value={props.players.red.scores.red}
								onChange={props.onValueChange}
							/>
						</td>
						<td data-label="Red">
							<Value
								type="red"
								player="blue"
								value={props.players.blue.scores.red}
								onChange={props.onValueChange}
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default Scorebox