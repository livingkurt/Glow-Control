import React, { useState, useEffect } from 'react';

const SettingSlider = (props) => {
	return (
		<div className="m-v-s">
			<label className="m-t-s" htmlFor={props.setting_name}>
				{props.display_name}
			</label>
			<div className="row">
				<input
					type="number"
					min="0"
					max="255"
					defaultValue={props.settings[props.setting_name]}
					className="w-6rem m-r-l"
					name={props.setting_name}
					onMouseUp={(e) => props.update_function(e.target.name, e.target.value)}
				/>
				<input
					type="range"
					min="0"
					max="255"
					defaultValue={props.settings[props.setting_name]}
					className="w-90"
					name={props.setting_name}
					onMouseUp={(e) => props.update_function(e.target.name, e.target.value)}
				/>
			</div>
		</div>
	);
};

export default SettingSlider;
