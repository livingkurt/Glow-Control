import React, { useState, useEffect } from 'react';

const DropdownSelector = (props) => {
	return (
		<div className="column m-v-s">
			<label htmlFor={props.setting.name}>{props.setting.label}</label>
			<select
				name={props.setting.name}
				defaultValue={props.setting.value}
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
