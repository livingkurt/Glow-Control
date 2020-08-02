import React from 'react';

const ToggleSwitch = (props) => {
	return (
		<div className="m-v-s ai-c">
			<label className="w-10">{props.setting.label}</label>
			<label className="switch">
				<input
					type="checkbox"
					name={props.setting.name}
					defaultChecked={props.setting.value === 1 ? true : false}
					onChange={(e) => props.update_function(e.target.name, e.target.checked === true ? 1 : 0)}
				/>
				<span className="slider round" />
			</label>
		</div>
	);
};

export default ToggleSwitch;
