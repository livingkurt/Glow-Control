import React, { useState, useEffect } from 'react';
import { ColorPicker } from '../ColorComponents';
import API from '../../util/API';

const Content = (props) => {
	const [ brightness, set_brightness ] = useState(255);
	const [ autoplay, set_autoplay ] = useState(true);
	const [ speed, set_speed ] = useState(50);

	const update_leds = async (field_name, value) => {
		try {
			const query_url = '192.168.0.219';
			const res = await API.update_leds(query_url, field_name, value);
			console.log(res);
			// set_pet_state(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="content">
			<div className="flex column">
				<div>
					<label>Power</label>
					<button>On</button>
					<button>Off</button>
				</div>
				<div>
					<label>Autoplay</label>
					<button>On</button>
					<button>Off</button>
				</div>
				<ColorPicker />

				<label for="red">Red</label>
				<input type="range" min="0" max="255" defaultValue="50" className="slider" name="red" />
				<label for="green">Green</label>
				<input type="range" min="0" max="255" defaultValue="50" className="slider" name="green" />
				<label for="blue">Blue</label>
				<input type="range" min="0" max="255" defaultValue="50" className="slider" name="blue" />

				<label for="brightness">Brightness</label>
				<input
					type="range"
					min="0"
					max="255"
					defaultValue={brightness}
					className="slider"
					name="brightness"
					onChange={(e) => update_leds(e.target.name, e.target.value)}
				/>
				<label for="autoplay_duration">Autoplay Duration</label>
				<input type="range" min="0" max="255" defaultValue="50" className="slider" name="autoplay_duration" />
				<label for="speed">Speed</label>
				<input type="range" min="0" max="255" defaultValue="50" className="slider" name="speed" />
				<label for="pattern">Pattern</label>
				<select type="range" min="0" max="255" defaultValue="50" className="slider" name="pattern" />
				<label for="palette">Palette</label>
				<select type="range" min="0" max="255" defaultValue="50" className="slider" name="palette" />
				<button>Reset</button>
			</div>
		</div>
	);
};

export default Content;
