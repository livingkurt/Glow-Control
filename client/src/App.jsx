import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import { Header, Footer, Content } from './components/ContainerComponents';

function App() {
	return (
		// <Router>
		<div className="container">
			<Header />
			<Content />
			<Footer />
		</div>
		// </Router>
	);
}

export default App;
