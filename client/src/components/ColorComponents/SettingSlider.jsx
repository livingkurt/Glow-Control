import React, { useState, useEffect } from 'react';

const SettingSlider = (props) => {
	const [ value, set_value ] = useState(props.setting.value);
	return (
		<div className="m-v-s">
			<div className="row">
				<label className="m-t-s w-16rem" htmlFor={props.setting.name}>
					{props.setting.label}
				</label>
				<input
					type="number"
					min={props.setting.min}
					max={props.setting.max}
					step={props.setting.step}
					value={value}
					className="w-8rem m-r-l"
					name={props.setting.name}
					onMouseUp={(e) => props.update_function(e.target.name, e.target.value)}
					// onChange={(e) =>
					// 	props.set_settings({
					// 		...props.settings,
					// 		[props.setting.name]: { ...props.settings[props.setting.name], value: e.target.value }
					// 	})}
					onChange={(e) => set_value(e.target.value)}
				/>
				<input
					type="range"
					min={props.setting.min}
					max={props.setting.max}
					step={props.setting.step}
					value={value}
					dir={props.direction}
					className="w-90"
					name={props.setting.name}
					onMouseUp={(e) => props.update_function(e.target.name, e.target.value)}
					onBlur={(e) => props.update_function(e.target.name, e.target.value)}
					// onChange={(e) =>
					// 	props.set_settings({
					// 		...props.settings,
					// 		[props.setting.name]: { ...props.settings[props.setting.name], value: e.target.value }
					// 	})}
					onChange={(e) => set_value(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default SettingSlider;
