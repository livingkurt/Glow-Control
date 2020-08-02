import React, { useState, useEffect } from 'react';

const DropdownSelector = (props) => {
	return (
		<div className="column m-v-s">
			<label htmlFor={props.setting_name}>{props.display_name}</label>
			<select
				name={props.setting_name}
				defaultValue={props.settings.pattern}
				onChange={(e) => props.update_function(e.target.name, e.target.value)}
			>
				{props.data.map((item, index) => {
					return (
						<option value={index} key={index}>
							{item}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default DropdownSelector;
