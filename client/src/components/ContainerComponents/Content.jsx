import React, { useState, useEffect } from 'react';
import { ColorPicker } from '../ColorComponents';
import API from '../../util/API';

const Content = (props) => {
	const [ brightness, set_brightness ] = useState(255);
	const [ autoplay, set_autoplay ] = useState(true);
	const [ speed, set_speed ] = useState(50);

	const update_leds = async (field_name, value) => {
		try {
			// const query_url = '192.168.0.219';
			// const query_url = '192.168.0.60';
			const query_url = '192.168.0.152';
			const res = await API.update_leds(query_url, field_name, value);
		} catch (err) {
			console.log(err);
		}
	};

	const update_solid_color = async (red_value, green_value, blue_value) => {
		try {
			// const query_url = '192.168.0.219';
			// const query_url = '192.168.0.60';
			const query_url = '192.168.0.152';
			const res = await API.update_solid_color(query_url, red_value, green_value, blue_value);
		} catch (err) {
			console.log(err);
		}
	};

	const patterns = [
		'Pride',
		'Cycle Rainbow Desaturated',
		'Color Waves',
		'Rainbow Twinkles',
		'Snow Twinkles',
		'Cloud Twinkles',
		'Incandescent Twinkles',
		'Solid Rainbow',
		'Confetti',
		'Sinelon',
		'Beat',
		'Juggle',
		'Fire',
		'Water',
		'Solid Color'
	];

	const palettes = [
		'Rainbow',
		'Rainbow Stripe',
		'Cloud',
		'Lava',
		'Ocean',
		'Forest',
		'Party',
		'Heat',
		'Ocean Sunset'
	];

	return (
		<div className="content">
			<div className="flex column">
				<div>
					<label>Power</label>
					<button name="power" onClick={(e) => update_leds(e.target.name, 1)}>
						On
					</button>
					<button name="power" onClick={(e) => update_leds(e.target.name, 0)}>
						Off
					</button>
				</div>
				<div>
					<label>Autoplay</label>
					<button name="autoplay" onClick={(e) => update_leds(e.target.name, 1)}>
						On
					</button>
					<button name="autoplay" onClick={(e) => update_leds(e.target.name, 0)}>
						Off
					</button>
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
					onMouseOut={(e) => update_leds(e.target.name, e.target.value)}
				/>
				<label for="autoplay_duration">Autoplay Duration</label>
				<input
					type="range"
					min="0"
					max="255"
					defaultValue="50"
					className="slider"
					name="autoplay_duration"
					onMouseOut={(e) => update_leds(e.target.name, e.target.value)}
				/>
				<label for="speed">Speed</label>
				<input
					type="range"
					min="0"
					max="255"
					defaultValue="50"
					className="slider"
					name="speed"
					onMouseOut={(e) => update_leds(e.target.name, e.target.value)}
				/>
				<label for="pattern">Pattern</label>
				<select name="pattern" onChange={(e) => update_leds(e.target.name, e.target.value)}>
					{patterns.map((pattern, index) => {
						return (
							<option value={index} key={index}>
								{pattern}
							</option>
						);
					})}
				</select>
				<label for="palette">Palette</label>
				<select name="palette" onChange={(e) => update_leds(e.target.name, e.target.value)}>
					{palettes.map((pattern, index) => {
						return (
							<option defaultValue={index} key={index}>
								{pattern}
							</option>
						);
					})}
				</select>
				<button>Reset</button>
			</div>
		</div>
	);
};

export default Content;
