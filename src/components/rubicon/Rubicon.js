import React from 'react'
import title from '../../static/rubicon/title.png'
import map from '../../static/rubicon/map.png'
import Point from '../Point'
import app from '../../firebase'
import Scorebox from './Scorebox'

import '../../css/rubicon.css'

const firestore = app.firestore()

const defaultScore = {
	red: 0,
	gray: 0,
	yellow: 0,
	blue: 0,
	win: 0
}

const _TURNTOCOLOR = {
	0: "blue",
	1: "red",
	2: "blue",
	3: "blue",
	4: "red",
	5: "red",
	6: "blue",
	7: "blue",
	8: "blue",
	9: "red",
	10: "red",
	11: "red"
}

const _TURNTOMOVESLEFT = {
	0: 1,
	1: 1,
	2: 2,
	3: 1,
	4: 2,
	5: 2,
	6: 3,
	7: 2,
	8: 1,
	9: 3,
	10: 2,
	11: 1
}

class Rubicon extends React.Component {
	state = {
		currentPoint: {
			x: 0,
			y: 0,
			color: "blue",
			turn: 0
		},
		points: [],
		players: {
			red: {
				scores: defaultScore,
				name: "red"
			},
			blue: {
				scores: defaultScore,
				name: "blue"
			}
		}
	}

	constructor(props) {
		super(props)

		this.map = React.createRef()
		this.onMouseMove = this.onMouseMove.bind(this)
	}

	onTurn = pointsQuery => {
		if (!pointsQuery.size) {
			this.setState({
				points: [],
				currentPoint: {
					...this.state.currentPoint,
					turn: 0
				}
			})
			return
		}

		const points = []
		pointsQuery.forEach(d => {
			points.push({
				...d.data(),
				id: d.id
			})
		})
		const lastPoint = this.getLatestPoint(points)
		this.setState({
			points,
			currentPoint: {
				x: this.state.currentPoint.x,
				y: this.state.currentPoint.y,
				color: this.turnToColor(lastPoint.turn),
				turn: lastPoint.turn
			}
		})
	}

	getLatestPoint(points) {
		return points.reduce((acc, point) => {
			if (point.turn > acc.turn)
				return point
			else {
				return acc
			}
		}, points[0])
	}

	componentDidMount() {
		firestore.collection(`games/rubicon/games/${this.props.match.params.id}/points`).onSnapshot(this.onTurn)
		firestore.doc(`games/rubicon/games/${this.props.match.params.id}`).onSnapshot(this.onGameDataChange)
	}

	onMouseMove({ clientX, clientY }) {
		const mapX = this.map.current.x
		const mapY = this.map.current.y
		this.setState({
			currentPoint: {
				x: clientX - mapX,
				y: clientY - mapY,
				color: this.state.currentPoint.color,
				turn: this.state.currentPoint.turn
			}
		})
	}

	turnToColor = turn => {
		return _TURNTOCOLOR[turn % 12]
	}

	movesLeft = () => {
		return _TURNTOMOVESLEFT[this.state.currentPoint.turn % 12]
	}

	removeLastPoint = () => {
		if (!this.state.points.length) return
		firestore.doc(`games/rubicon/games/${this.props.match.params.id}/points/${this.getLatestPoint(this.state.points).id}`).delete()
	}

	onClick = async () => {
		const currentPoint = {
			x: this.state.currentPoint.x,
			y: this.state.currentPoint.y,
			color: this.turnToColor(this.state.currentPoint.turn),
			turn: this.state.currentPoint.turn + 1
		}
		await firestore.collection(`games/rubicon/games/${this.props.match.params.id}/points`).add(currentPoint)
	}

	onGameDataChange = docSnapshot => {
		const gameData = docSnapshot.data() ?? {}
		if (Object.keys(gameData).length && Object.keys(gameData.players).length) {
			this.setState({
				players: gameData.players
			})
		}
	}

	parseName = string => {
		return string.split("<div>").join("").split("</div>").join("").split("<br>").join("")
	}

	onPlayerChange = (event, type, player, isPlayerName) => {
		let newPlayerData = {}
		if (isPlayerName) {
			newPlayerData = this.state.players
			newPlayerData[type].name = this.parseName(event.target.value)
			this.setState({
				players: newPlayerData
			})
		} else {
			if (String(parseInt(event.target.value)) === event.target.value || event.target.value === "") {
				const newScore = JSON.parse(JSON.stringify(this.state.players[player].scores))
				newScore[type] = parseInt(event.target.value)

				newPlayerData = {
					...this.state.players,
					[player]: {
						...this.state.players[player],
						scores: newScore
					}
				}
			} else {
				this.forceUpdate()
				return
			}
		}
		firestore.doc(`games/rubicon/games/${this.props.match.params.id}`).set({
			players: newPlayerData
		})
	}

	render() {
		console.log(this.state)
		return (
			<div>
				<div className="container">
					<img className="title" src={title} alt="Rubicon" />
					<h3 className="gameid">Game ID: {this.props.match.params.id}</h3>
					<div className="details">
						<div>Turn <span style={{ color: this.state.currentPoint.color }}>{this.state.currentPoint.color.toUpperCase()}</span></div>
						<div>{this.state.currentPoint.turn ? `Move ${this.state.currentPoint.turn}` : "First move"}</div>
						<div>{this.movesLeft()} move{this.movesLeft() > 1 ? "s" : ""} left</div>
					</div>
					<button className="mini ui button negative" onClick={this.removeLastPoint}>Undo Last Move</button>
					<div
						onMouseMove={this.onMouseMove}
						onClick={this.onClick}
						className="map-container"
					>
						<img className="map" src={map} alt="Map" ref={this.map} />
						{this.state.points.map(point =>
							<Point
								key={Math.random()}
								color={point.color}
								x={point.x}
								y={point.y}
							/>
						)}
						<Point
							color={this.state.currentPoint.color}
							x={this.state.currentPoint.x}
							y={this.state.currentPoint.y}
						/>
					</div>
				</div>
				<Scorebox
					onChange={this.onPlayerChange}
					red={this.state.players.red}
					blue={this.state.players.blue}
				/>
			</div>
		)
	}
}

export default Rubicon