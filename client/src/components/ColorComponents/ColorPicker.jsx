import React, { useState, useEffect } from 'react';
import ColorBox from './ColorBox';

const ColorPicker = (props) => {
	return (
		<div>
			<input type="color" />
			<div className="flex row">
				<ColorBox color="red" />
				<ColorBox color="orange" />
				<ColorBox color="yellow" />
				<ColorBox color="green" />
				<ColorBox color="blue" />
				<ColorBox color="purple" />
			</div>
		</div>
	);
};

export default ColorPicker;
