import React, { useEffect } from 'react';

const HSVSlider = (props) => {
	const update = (e) => {
		props.update_function(e.target.name, e.target.value);
		props.set_hsv({ ...props.hsv, [props.color]: e.target.value });
	};
	useEffect(
		() => {
			return () => {};
		},
		[ props.hsv[props.color] ]
	);
	return (
		<div className="m-v-s w-100">
			<div className="row">
				<label className="m-t-s w-16rem" htmlFor={props.color}>
					{props.color.toUpperCase()}
				</label>
				<input
					type="number"
					min="0"
					max="255"
					step="1"
					value={props.hsv[props.color]}
					className="w-8rem m-r-l"
					name={props.color}
					onMouseUp={(e) => update(e)}
					onChange={(e) => props.set_hsv({ ...props.hsv, [props.color]: e.target.value })}
				/>
				<input
					type="range"
					min="0"
					max="255"
					step="1"
					value={props.hsv[props.color]}
					dir={props.direction}
					className="w-90"
					name={props.color}
					onMouseUp={(e) => update(e)}
					onBlur={(e) => update(e)}
					onChange={(e) => props.set_hsv({ ...props.hsv, [props.color]: e.target.value })}
				/>
			</div>
		</div>
	);
};

export default HSVSlider;
