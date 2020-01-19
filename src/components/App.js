import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../history'
import Rubicon from './rubicon/Rubicon'
import Home from './Home'
import RubiconHome from './rubicon/RubiconHome'

const App = () => {
	return (
		<div>
			<Router history={history}>
				<div>
					<Switch>
						<Route path="/rubicon" exact component={RubiconHome} />
						<Route path="/rubicon/:id" exact component={Rubicon} />
						<Route path="/" exact component={Home} />
					</Switch>
				</div>
			</Router>
		</div >
	)
}

export default App