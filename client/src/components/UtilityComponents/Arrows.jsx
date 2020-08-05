import React from 'react';

const Arrows = (props) => {
	const increment = () => {
		if (props.direction === 'rtl') {
			props.set_value((value) => value - 1);
			props.update_function(props.name, props.value - 1);
		} else {
			props.set_value((value) => value + 1);
			props.update_function(props.name, props.value + 1);
		}
	};
	const decrement = () => {
		if (props.direction === 'rtl') {
			props.set_value((value) => value + 1);
			props.update_function(props.name, props.value + 1);
		} else {
			props.set_value((value) => value - 1);
			props.update_function(props.name, props.value - 1);
		}
	};
	return (
		<div className="row">
			<button onClick={() => decrement()} className="btn primary w-4rem">
				<i className="fas fa-arrow-left f-s-12" />
			</button>
			<button onClick={() => increment()} className="btn primary w-4rem m-l-s">
				<i className="fas fa-arrow-right f-s-12" />
			</button>
		</div>
	);
};

export default Arrows;
