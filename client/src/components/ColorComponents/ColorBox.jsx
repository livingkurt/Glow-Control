import React, { useState, useEffect } from 'react';

const ColorBox = (props) => {
	return (
		<div>
			<button
				className="button zoom"
				style={{
					backgroundColor: props.color,
					height: '40px',
					width: '60px',
					border: 0,
					borderRadius: '10px',
					marginRight: '10px'
				}}
			/>
		</div>
	);
};

export default ColorBox;
