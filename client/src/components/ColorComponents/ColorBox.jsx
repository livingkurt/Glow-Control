import React, { useState, useEffect } from 'react';

const ColorBox = (props) => {
	return (
		<div>
			<button
				style={{
					backgroundColor: props.color,
					height: '40px',
					width: '60px',
					border: 0,
					borderRadius: '10px'
				}}
			/>
		</div>
	);
};

export default ColorBox;
