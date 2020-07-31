import React from 'react';

const Loading = (props) => {
	return (
		<div>
			{props.loading ? (
				<div className="flex js_center column">
					<img src="loading.gif" className="loading_gif" alt="loading" />
					<img src="loading_overlay.png" className="loading_png" alt="loading" />
					<h3 style={{ textAlign: 'center' }}>If page doesn't show in 5 seconds, refresh the page.</h3>
				</div>
			) : props.error ? (
				<div className="flex js_center">
					<h3 style={{ textAlign: 'center' }}>Page Error</h3>
					<h3 style={{ textAlign: 'center' }}>{props.error} </h3>
				</div>
			) : (
				props.children
			)}
		</div>
	);
};

export default Loading;
