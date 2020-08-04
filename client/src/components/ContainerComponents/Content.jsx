import React, { useState, useEffect, useRef } from 'react';
import { ColorPicker, SettingSlider, RGBSlider, DropdownSelector } from '../ColorComponents';
import { Route, BrowserRouter as Router, Switch, Link, useHistory } from 'react-router-dom';
import API from '../../util/API';
import { ToggleSwitch } from '../UtilityComponents';
import { StrobePage, SparklePage, PatternPage, ShootingStarPage, SolidColorPage } from '../pages';

const Content = (props) => {
	const query_url = '192.168.0.152';
	// const leds = '192.168.0.219';
	// const leds = '192.168.0.60';

	const autoplay_ref = useRef();
	console.log(autoplay_ref);

	const devices = {
		living_room: { name: 'Living Room', query_url: '192.168.0.219' },
		test: { name: 'Test', query_url: '192.168.0.152' }
	};

	const [ settings, set_settings ] = useState({});
	const [ leds, set_leds ] = useState(devices);
	const [ current_device, set_current_device ] = useState(leds.test);
	const [ patterns, set_patterns ] = useState([]);
	const [ palettes, set_palettes ] = useState([]);
	const [ solid_color, set_solid_color ] = useState({});
	const [ loading, set_loading ] = useState(true);
	const [ show_hide, set_show_hide ] = useState();
	const [ mode_specific_settings, set_mode_specific_settings ] = useState('');

	useEffect(() => {
		get_all_settings(current_device.query_url);
		set_leds(devices);
		return () => {};
	}, []);

	function camelize(str) {
		return str
			.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
				return index === 0 ? word.toLowerCase() : word.toUpperCase();
			})
			.replace(/\s+/g, '');
	}

	const update_leds = async (field_name, value) => {
		try {
			console.log(field_name);
			const res = await API.update_leds(current_device.query_url, field_name, value);
			if (field_name === 'pattern') {
				let pattern = camelize(patterns[value]);
				console.log(pattern);
				set_mode_specific_settings(pattern);
			} else if (field_name === 'autoplay') {
				if (show_hide === 1) {
					set_show_hide(0);
					// fade_in();
				} else if (show_hide === 0) {
					set_show_hide(1);
					// fade_out();
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	const update_rgb = async (field_name, value) => {
		try {
			const res = await API.update_leds(current_device.query_url, field_name, value);
		} catch (err) {
			console.log(err);
		}
	};

	const get_all_settings = async (query_url) => {
		try {
			const res = await API.get_all_settings(query_url);

			const settings = res.data;
			let saved_settings = {};
			settings.map((setting) => {
				return (saved_settings[setting.name] = setting);
			});
			set_settings(saved_settings);
			set_patterns(settings[2].options);
			set_palettes(settings[3].options);
			set_mode_specific_settings(camelize(saved_settings.pattern.options[saved_settings.pattern.value]));
			set_show_hide(saved_settings.autoplay.value);
			set_loading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const update_solid_color = async (red_value, green_value, blue_value) => {
		try {
			const res = await API.update_solid_color(
				current_device.query_url,
				solid_color.red,
				solid_color.green,
				solid_color.blue
			);
		} catch (err) {
			console.log(err);
		}
	};

	const reset_device = async () => {
		try {
			const res = await API.reset_device(current_device.query_url);
		} catch (err) {
			console.log(err);
		}
	};
	console.log({ settings });

	const change_device = (current_device) => {
		set_current_device(current_device);
		get_all_settings(current_device.query_url);
		set_loading(true);
	};

	// const [ opacity, set_opacity ] = useState(1);
	// const fade_in = () => {
	// 	let element = document.getElementById('autoplay_duration');
	// 	console.log(element);
	// 	var op = 1; // initial opacity
	// 	var timer = setInterval(function() {
	// 		if (op <= 0.1) {
	// 			clearInterval(timer);
	// 			element.style.display = 'none';
	// 		}
	// 		element.style.opacity = op;
	// 		element.style.filter = 'alpha(opacity=' + op * 100 + ')';
	// 		op -= op * 0.2;
	// 	}, 50);
	// 	set_show_hide(0);
	// };
	// const fade_out = () => {
	// 	var op = 0.1; // initial opacity
	// 	let element = document.getElementById('autoplay_duration');
	// 	console.log(element);
	// 	element.style.display = 'block';
	// 	var timer = setInterval(function() {
	// 		if (op >= 1) {
	// 			clearInterval(timer);
	// 		}
	// 		element.style.opacity = op;
	// 		element.style.filter = 'alpha(opacity=' + op * 100 + ')';
	// 		op += op * 0.1;
	// 	}, 10);
	// 	set_show_hide(1);
	// };

	return (
		<Router>
			<div className="content w-100">
				<div className="jc-b">
					<div className="jc-b w-20rem">
						<button onClick={() => change_device(leds.living_room)} className="btn btn-nav">
							Living Room
						</button>
						<button onClick={() => change_device(leds.test)} className="btn btn-nav">
							Test
						</button>
					</div>
					<button className="btn primary" onClick={() => reset_device()}>
						Reset
					</button>
				</div>
				{loading ? (
					<h1 className="t-a-c">Loading... Make Sure Device is Turned On</h1>
				) : (
					settings && (
						<div className="column w-100">
							<h1 className="t-a-c">{current_device.name}</h1>
							{settings.pattern.options
								.map((pattern) => {
									return camelize(pattern);
								})
								.includes(mode_specific_settings) && (
								<div>
									{/* <h2 className="t-a-c">Macro Controls</h2> */}
									<ToggleSwitch
										update_function={update_leds}
										set_settings={set_settings}
										setting={settings.power}
										settings={settings}
									/>
									<DropdownSelector
										update_function={update_leds}
										data={patterns}
										setting={settings.pattern}
										settings={settings}
									/>
									<SettingSlider
										update_function={update_leds}
										set_settings={set_settings}
										setting={settings.brightness}
										settings={settings}
									/>
									{[ 'shootingStar', 'beat' ].includes(mode_specific_settings) && (
										<div>
											{/* <h1 className="t-a-c">Palettes</h1> */}
											<SettingSlider
												update_function={update_leds}
												set_settings={set_settings}
												setting={settings.speed}
												settings={settings}
											/>
										</div>
									)}
									<ToggleSwitch
										update_function={update_leds}
										set_settings={set_settings}
										setting={settings.autoplay}
										settings={settings}
									/>
									{console.log(show_hide)}
									<div style={{ display: show_hide === 1 ? 'flex' : 'none' }}>
										<SettingSlider
											update_function={update_leds}
											set_settings={set_settings}
											setting={settings.autoplayDuration}
											settings={settings}
										/>
									</div>
								</div>
							)}
							{[ 'strobe', 'sparkle', 'shootingStar', 'cycle', 'beat' ].includes(
								mode_specific_settings
							) && (
								<div>
									<h2 className="t-a-c">Palettes</h2>
									<DropdownSelector
										update_function={update_leds}
										data={palettes}
										setting={settings.palette}
										settings={settings}
									/>
									<ToggleSwitch
										update_function={update_leds}
										set_settings={set_settings}
										setting={settings.blendMode}
										settings={settings}
									/>
								</div>
							)}
							{[ 'strobe', 'pulse', 'cycle', 'sparkle', 'shootingStar', 'beat' ].includes(
								mode_specific_settings
							) && (
								<div>
									<h2 className="t-a-c">Color Options</h2>
									<SettingSlider
										update_function={update_leds}
										set_settings={set_settings}
										setting={settings.colorDensity}
										settings={settings}
									/>
									<SettingSlider
										update_function={update_leds}
										set_settings={set_settings}
										setting={settings.colorSpeed}
										settings={settings}
										direction="rtl"
									/>
									{[ 'sparkle', 'shootingStar', 'beat' ].includes(mode_specific_settings) && (
										<SettingSlider
											update_function={update_leds}
											set_settings={set_settings}
											setting={settings.colorFade}
											settings={settings}
											direction="rtl"
										/>
									)}
								</div>
							)}
							{[ 'rainbowTwinkles', 'snowTwinkles', 'cloudTwinkles', 'incandescentTwinkles' ].includes(
								mode_specific_settings
							) && (
								<div>
									<h2 className="t-a-c">Sparkle</h2>
									<SettingSlider
										update_function={update_leds}
										setting={settings.twinkleSpeed}
										settings={settings}
									/>
									<SettingSlider
										update_function={update_leds}
										setting={settings.twinkleDensity}
										settings={settings}
									/>
								</div>
							)}

							{mode_specific_settings === 'strobe' && (
								<div>
									<h2 className="t-a-c">Strobe</h2>
									<SettingSlider
										update_function={update_leds}
										set_settings={set_settings}
										setting={settings.strobe}
										settings={settings}
									/>
									<SettingSlider
										update_function={update_leds}
										set_settings={set_settings}
										setting={settings.blank}
										settings={settings}
									/>
									<SettingSlider
										update_function={update_leds}
										set_settings={set_settings}
										setting={settings.gap}
										settings={settings}
									/>
								</div>
							)}
							{mode_specific_settings === 'solidColor' && (
								<div>
									<h2 className="t-a-c">Solid Color</h2>
									<ColorPicker />
									<RGBSlider
										display_name="Red"
										setting_name="red"
										update_function={update_rgb}
										solid_color={solid_color.red}
									/>
									<RGBSlider
										display_name="Green"
										setting_name="green"
										update_function={update_rgb}
										solid_color={solid_color.green}
									/>
									<RGBSlider
										display_name="Blue"
										setting_name="blue"
										update_function={update_rgb}
										solid_color={solid_color.blue}
									/>
								</div>
							)}
						</div>
					)
				)}
			</div>
		</Router>
	);
};

export default Content;
