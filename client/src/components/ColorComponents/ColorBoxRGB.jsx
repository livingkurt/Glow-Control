import React, { useState, useEffect } from 'react';

const ColorBox = (props) => {
	const red = props.color.split(',')[0];
	const green = props.color.split(',')[1];
	const blue = props.color.split(',')[2];
	return (
		<div>
			<button
				className="button zoom"
				name="rgb"
				style={{
					backgroundColor: `rgb(${props.color})`,
					height: '40px',
					width: '60px',
					border: 0,
					borderRadius: '10px'
					// marginRight: '10px'
				}}
				onClick={(e) => props.update_function(e.target.name, e.target.value, red, green, blue)}
			/>
		</div>
	);
};

export default ColorBox;
