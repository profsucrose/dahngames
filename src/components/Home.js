import React from 'react'
import { Link } from 'react-router-dom'

import '../css/home.css'

const Home = () => {
	return (
		<div className="container">
			<h1 class="title">dahngames</h1>
			<h4 class="by">BY JOSHUA DAHN</h4>
			<p class="descript">The best games in the world. Ever.</p>
			<Link class="game-link" to="/rubicon">RUBICON</Link>
		</div>
	)
}

export default Home