import React from 'react'
import title from '../../static/usonia/title.png'
import map from '../../static/usonia/map.png'
import Point from '../Point'
import app from '../../firebase'
import SetSequence from './SetSequence'
import Modal from '../Modal'
import Scorebox from './Scorebox'

import '../../css/usonia.css'
import FillInBox from './FillInBox'
import FillIn from './FillIn'

const firestore = app.firestore()

class Usonia extends React.Component {
	state = {
		fillIn: {
			fillingIn: false,
			shape: null,
			rot90: 0,
		},
		currentPoint: {
			x: 0,
			y: 0,
			color: "blue"
		},
		players: {
			red: {
				name: "RED",
				scores: {
					basic: 0,
					yellow: 0,
					red: 0
				}
			},
			blue: {
				name: "BLUE",
				scores: {
					basic: 0,
					yellow: 0,
					red: 0
				}
			}
		},
		turn: 0,
		currentSequence: [],
		points: []
	}

	constructor(props) {
		super(props)

		this.map = React.createRef()
		this.onMouseMove = this.onMouseMove.bind(this)
	}

	onTurn = pointsQuery => {
		this.setState({
			points: pointsQuery.docs.map(doc => {
				return {
					...doc.data(),
					id: doc.id
				}
			})
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

	onNewFillIn = querySnapshot => {
		this.setState({
			fillIns: querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
		})
	}

	componentDidMount() {
		firestore.collection(`games/usonia/games/${this.props.match.params.id}/points`).onSnapshot(this.onTurn)
		firestore.collection(`games/usonia/games/${this.props.match.params.id}/fillins`).onSnapshot(this.onNewFillIn)
		firestore.doc(`games/usonia/games/${this.props.match.params.id}`).onSnapshot(this.onGameDataChange)
	}

	onMouseMove({ clientX, clientY }) {
		const mapX = this.map.current.x
		const mapY = this.map.current.y

		this.setState({
			currentPoint: {
				x: clientX - mapX,
				y: clientY - mapY,
				color: this.state.currentPoint.color,
				turn: this.state.turn
			}
		})
	}

	removeLastPoint = () => {
		if (!this.state.points.length) return
		firestore.doc(`games/usonia/games/${this.props.match.params.id}/points/${this.getLatestPoint(this.state.points).id}`).delete()
	}

	onClick = () => {
		const currentPoint = {
			...this.state.currentPoint,
			turn: this.state.turn
		}

		this.setState({
			fillIn: {
				...this.state.fillIn,
				fillingIn: false
			}
		})

		if (this.state.fillIn.fillingIn) {
			firestore.collection(`games/usonia/games/${this.props.match.params.id}/fillins`).add({
				...this.state.fillIn,
				...this.state.currentPoint
			})
		} else {
			firestore.collection(`games/usonia/games/${this.props.match.params.id}/points`).add(currentPoint)
		}
	}

	onGameDataChange = docSnapshot => {
		const gameData = docSnapshot.data() ?? {}
		console.log(gameData)
		if (Object.keys(gameData).length) {
			this.setState({
				players: gameData.players ?? this.state.players,
				currentPoint: {
					...this.state.currentPoint,
					color: gameData.currentColor ?? "blue"
				},
				turn: gameData.turn ?? 0
			})
		} else {
			this.setState({
				players: {
					red: {
						name: "red",
						scores: {
							basic: 0,
							yellow: 0,
							red: 0
						}
					},
					blue: {
						name: "blue",
						scores: {
							basic: 0,
							yellow: 0,
							red: 0
						}
					}
				},
				turn: 0
			})
		}
	}

	parseName = string => {
		return string.split("<div>").join("").split("</div>").join("").split("<br>").join("")
	}

	onSetSequence = sequence => {
		const { value } = sequence.target
		const currentSequence = value === 1
			? [1, 1, 3]
			: [2, 2, 1]
		this.setState({
			currentSequence
		})
	}

	notColor(color) {
		return color === "blue"
			? "red"
			: "blue"
	}

	endTurn = () => {
		firestore.doc(`games/usonia/games/${this.props.match.params.id}`).set({
			currentColor: this.notColor(this.state.currentPoint.color),
			turn: this.state.turn + 1
		}, { merge: true })
	}

	clearGame = () => {
		firestore.doc(`games/usonia/games/${this.props.match.params.id}`).delete()
		this.state.points.forEach(({ id }) => {
			firestore.doc(`games/usonia/games/${this.props.match.params.id}/points/${id}`).delete()
		})
		this.setState({
			clearGame: false
		})
	}

	renderModal() {
		const { clearGame } = this.state

		if (!clearGame) {
			return null
		}

		return (
			<Modal
				width="500px"
				title="Clear Game"
				content="Are you sure you want to wipe your game? This action is irreversible."
				actions={
					<>
						<button className="ui button primary" onClick={() => this.setState({ clearGame: false })}>Cancel</button>
						<button className="ui button negative" onClick={this.clearGame}>Do It</button>
					</>
				}
				onDismiss={() => this.setState({ clearGame: false })}
			/>
		)
	}

	parseHTML = string => {
		return string.replace(/(<div>|<\/div>|<br\/>)/gi, "")
	}

	onValueChange = (e, type, player) => {
		const { value } = e.target
		let newPlayer = {}
		const currentPlayerData = JSON.parse(JSON.stringify(this.state.players[player]))

		if (type === "player") {
			newPlayer = {
				...currentPlayerData,
				name: this.parseHTML(value).toUpperCase()
			}
		} else {
			newPlayer = {
				...currentPlayerData,
				scores: {
					...currentPlayerData.scores,
					[type]: parseInt(value) ? parseInt(value) : 0
				}
			}
		}

		this.setState({
			players: {
				...this.state.players,
				[player]: newPlayer
			}
		})

		firestore.doc(`games/usonia/games/${this.props.match.params.id}`).set({
			players: {
				...this.state.players,
				[player]: newPlayer
			}
		}, { merge: true })
	}

	onFillIn = shape => {
		console.log(shape)
		this.setState({
			fillIn: {
				...this.state.fillIn,
				shape,
				fillingIn: shape === this.state.fillIn.shape ? !this.state.fillIn.fillingIn : true
			}
		})
	}

	renderCurrentPoint = () => {
		const { fillIn } = this.state
		console.log(fillIn)

		if (fillIn.fillingIn) {
			return (
				<FillIn
					fillIn={fillIn}
					x={this.state.currentPoint.x}
					y={this.state.currentPoint.y}
					color={this.state.currentPoint.color}
				/>
			)
		}

		return (
			<Point
				color={this.state.currentPoint.color}
				x={this.state.currentPoint.x}
				y={this.state.currentPoint.y}
			/>
		)
	}

	rotateFillIn = () => {
		this.setState({
			fillIn: {
				...this.state.fillIn,
				rot90: this.state.fillIn.rot90 + 1
			}
		})
	}

	renderFillIns = () => {
		return (
			(this.state.fillIns ?? []).map(data => {
				return (
					<FillIn
						fillIn={data}
						x={data.x}
						y={data.y}
						color={data.color}
						shape={data.shape}
						rot90={data.rot90}
					/>
				)
			})
		)
	}

	render() {
		return (
			<div className="container">
				{this.renderModal()}
				<div className="upper-section">
					<div className="header-box">
						<img className="title-usonia" src={title} alt="usonia" />
						<h3 className="gameid">Game ID: {this.props.match.params.id}</h3>
						<h3>{this.state.turn ? `Turn ${this.state.turn + 1}` : "First Turn"}</h3>
						<FillInBox
							onFillIn={this.onFillIn}
							rotateFillIn={this.rotateFillIn}
						/>
						<SetSequence
							turn={Math.floor((this.state.turn % 6) / 2)}
							onSetSequence={this.onSetSequence}
						/>
						<button className="ui button primary btn-game" onClick={this.endTurn}>
							End Turn
					</button>
						<button className="ui button negative btn-game" onClick={() => this.setState({ clearGame: true })}>
							Clear Game
					</button>
					</div>
					<Scorebox
						players={this.state.players}
						onValueChange={this.onValueChange}
					/>
				</div>
				<div
					onMouseMove={this.onMouseMove}
					onClick={this.onClick}
					className="map-container"
				>
					<img className="map-usonia" src={map} alt="Map" ref={this.map} />
					{this.state.points.map(({ color, x, y, id }) =>
						<Point
							key={id}
							color={color}
							x={x}
							y={y}
						/>
					)}
					{this.renderCurrentPoint()}
					{this.renderFillIns()}
				</div>
			</div>
		)
	}
}

export default Usonia