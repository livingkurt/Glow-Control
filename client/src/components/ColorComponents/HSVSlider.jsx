import React, { useState, useEffect } from 'react';

const RGBSlider = (props) => {
	const [ value, set_value ] = useState(props.solid_color[props.color]);
	// const [ rgb, set_rgb ] = useState({
	// 	// red: props.solid_color.red,
	// 	red: props.color === 'red' ? props.solid_color[props.color] : props.solid_color.red,
	// 	green: props.color === 'green' ? props.solid_color[props.color] : props.solid_color.green,
	// 	blue: props.color === 'blue' ? props.solid_color[props.color] : props.solid_color.blue
	// 	// green: props.solid_color.green,
	// 	// blue: props.solid_color.blue
	// });
	const update = (e) => {
		props.update_function(e.target.name, e.target.value);
		props.update_function(e.target.name, e.target.value);
	};

	return (
		<div className="m-v-s w-100">
			<div className="row">
				<label className="m-t-s w-16rem" htmlFor={props.setting.name}>
					{props.setting.label}
				</label>
				<input
					type="number"
					min="0"
					max="255"
					step="1"
					value={value}
					className="w-8rem m-r-l"
					name={props.setting.name}
					onMouseUp={(e) => update(e)}
					onChange={(e) => set_value(e.target.value)}
				/>
				<input
					type="range"
					min="0"
					max="255"
					step="1"
					value={value}
					dir={props.direction}
					className="w-90"
					name={props.setting.name}
					onMouseUp={(e) => update(e)}
					onBlur={(e) => update(e)}
					onChange={(e) => set_value(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default RGBSlider;
