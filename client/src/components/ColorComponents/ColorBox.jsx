import React, { useState, useEffect } from 'react';

const ColorBox = (props) => {
	return (
		<div>
			<button style={{ backgroundColor: props.color }} />
		</div>
	);
};

export default ColorBox;
