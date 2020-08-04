import React, { useState, useEffect } from 'react';

const GreenSlider = (props) => {
	// const [ value, set_value ] = useState(props.solid_color.green);
	const update = (e) => {
		props.update_function(e.target.name, e.target.value);
		props.set_solid_color({ ...props.solid_color, green: e.target.value });
	};
	useEffect(
		() => {
			return () => {};
		},
		[ props.solid_color.green ]
	);
	return (
		<div className="m-v-s w-100">
			<div className="row">
				<label className="m-t-s w-16rem" htmlFor="green">
					Green
				</label>
				<input
					type="number"
					min="0"
					max="255"
					step="1"
					value={props.solid_color.green}
					className="w-8rem m-r-l"
					name="green"
					onMouseUp={(e) => update(e)}
					onChange={(e) => props.set_solid_color({ ...props.solid_color, green: e.target.value })}
				/>
				<input
					type="range"
					min="0"
					max="255"
					step="1"
					value={props.solid_color.green}
					dir={props.direction}
					className="w-90"
					name="green"
					onMouseUp={(e) => update(e)}
					onBlur={(e) => update(e)}
					onChange={(e) => props.set_solid_color({ ...props.solid_color, green: e.target.value })}
				/>
			</div>
		</div>
	);
};

export default GreenSlider;
