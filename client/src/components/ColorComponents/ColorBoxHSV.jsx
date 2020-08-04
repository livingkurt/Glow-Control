import React, { useState, useEffect } from 'react';

const ColorBoxHSV = (props) => {
	const hue = props.hsv.split(',')[0];
	const saturation = props.hsv.split(',')[1];
	const value = props.hsv.split(',')[2];
	return (
		<div>
			<button
				className="button zoom"
				name="hsv"
				style={{
					backgroundColor: `rgb(${props.rgb} )`,
					height: '40px',
					width: '60px',
					border: 0,
					borderRadius: '10px',
					margin: 'auto'
				}}
				onClick={(e) => props.update_function(e.target.name, e.target.value, hue, saturation, value)}
			/>
		</div>
	);
};

export default ColorBoxHSV;
