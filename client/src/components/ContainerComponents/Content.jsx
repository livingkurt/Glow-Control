import React, { useState, useEffect } from 'react';
import { ColorPicker } from '../ColorComponents';
import API from '../../util/API';

const Content = (props) => {
	const query_url = '192.168.0.152';
	// const query_url = '192.168.0.219';
	// const query_url = '192.168.0.60';

	useEffect(() => {
		get_all_settings();
		return () => {};
	}, []);

	// const [ brightness, set_brightness ] = useState(255);
	// const [ autoplay, set_autoplay ] = useState(true);
	// const [ speed, set_speed ] = useState(50);
	// const [ settings, set_settings ] = useState({
	// 	power: 1,
	// 	brightness: 255,
	// 	pattern: 0,
	// 	palette: 0,
	// 	speed: 50,
	// 	autoplay: 1,
	// 	autoplayDuration: 0,
	// 	solidColor: '255,128,0',
	// 	fire: 50,
	// 	cooling: 50,
	// 	sparking: 120,
	// 	twinkles: 120,
	// 	twinkleSpeed: 120,
	// 	twinkleDensity: 120
	// });
	const [ settings, set_settings ] = useState({});
	const [ patterns, set_patterns ] = useState([]);
	const [ palettes, set_palettes ] = useState([]);
	const [ solid_color, set_solid_color ] = useState({});
	const [ loading, set_loading ] = useState(true);

	const update_leds = async (field_name, value) => {
		try {
			const res = await API.update_leds(query_url, field_name, value);
		} catch (err) {
			console.log(err);
		}
	};

	const get_all_settings = async () => {
		try {
			const res = await API.get_all_settings(query_url);
			console.log(res.data);
			const settings = res.data;
			let saved_settings = {};
			settings.map((setting) => {
				return (saved_settings[setting.name] = setting.value);
			});
			set_settings(saved_settings);
			set_patterns(settings[2].options);
			set_palettes(settings[3].options);
			let color = saved_settings.solidColor.split(',');
			set_solid_color({ red: parseInt(color[0]), blue: parseInt(color[1]), green: parseInt(color[2]) });
			console.log({ saved_settings });
			set_loading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const update_solid_color = async (red_value, green_value, blue_value) => {
		try {
			const res = await API.update_solid_color(query_url, solid_color.red, solid_color.green, solid_color.blue);
		} catch (err) {
			console.log(err);
		}
	};

	const reset_device = async () => {
		try {
			const res = await API.reset_device(query_url);
		} catch (err) {
			console.log(err);
		}
	};
	console.log({ settings });

	return (
		<div className="content">
			{loading ? (
				<h1>Loading...</h1>
			) : (
				settings && (
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
						<input
							type="range"
							min="0"
							max="255"
							defaultValue={solid_color.red}
							className="slider"
							name="red"
						/>
						{console.log(solid_color.red)}
						<label for="green">Green</label>
						<input
							type="range"
							min="0"
							max="255"
							defaultValue={solid_color.green}
							className="slider"
							name="green"
						/>
						<label for="blue">Blue</label>
						<input
							type="range"
							min="0"
							max="255"
							defaultValue={solid_color.blue}
							className="slider"
							name="blue"
						/>

						<label for="brightness">Brightness</label>
						<input
							type="range"
							min="0"
							max="255"
							defaultValue={settings.brightness}
							className="slider"
							name="brightness"
							onMouseOut={(e) => update_leds(e.target.name, e.target.value)}
						/>
						<label for="autoplay_duration">Autoplay Duration</label>
						<input
							type="range"
							min="0"
							max="255"
							defaultValue={settings.autoplayDuration}
							className="slider"
							name="autoplay_duration"
							onMouseOut={(e) => update_leds(e.target.name, e.target.value)}
						/>
						<label for="speed">Speed</label>
						<input
							type="range"
							min="0"
							max="255"
							defaultValue={settings.speed}
							className="slider"
							name="speed"
							onMouseOut={(e) => update_leds(e.target.name, e.target.value)}
						/>
						<label for="pattern">Pattern</label>
						<select
							name="pattern"
							defaultValue={settings.pattern}
							onChange={(e) => update_leds(e.target.name, e.target.value)}
						>
							{patterns.map((pattern, index) => {
								return (
									<option value={index} key={index}>
										{pattern}
									</option>
								);
							})}
						</select>
						<label for="palette">Palette</label>
						<select
							name="palette"
							defaultValue={settings.palette}
							onChange={(e) => update_leds(e.target.name, e.target.value)}
						>
							{palettes.map((pattern, index) => {
								return (
									<option value={index} key={index}>
										{pattern}
									</option>
								);
							})}
						</select>
						<button onClick={() => reset_device()}>Reset</button>
					</div>
				)
			)}
		</div>
	);
};

export default Content;
