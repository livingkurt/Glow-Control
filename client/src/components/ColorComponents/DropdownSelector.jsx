import React, { useState, useEffect } from 'react';

const DropdownSelector = (props) => {
	return (
		<div className="row ai-c m-b-l">
			<label className="w-16rem" htmlFor={props.setting.name}>
				{props.setting.label}
			</label>
			<select
				name={props.setting.name}
				defaultValue={props.setting.value}
				className="w-100"
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
