import React, { useState, useEffect } from 'react';
import { ColorPicker, SettingSlider, RGBSlider, DropdownSelector } from '../ColorComponents';
import { Route, BrowserRouter as Router, Switch, Link, useHistory } from 'react-router-dom';
import API from '../../util/API';
import { ToggleSwitch } from '../UtilityComponents';
import { StrobePage, SparklePage, PatternPage, ShootingStarPage, SolidColorPage } from '../pages';

const Content = (props) => {
	const query_url = '192.168.0.152';
	let history = useHistory();
	// const query_url = '192.168.0.219';
	// const query_url = '192.168.0.60';

	useEffect(() => {
		get_all_settings();
		return () => {};
	}, []);

	const [ settings, set_settings ] = useState({});
	const [ patterns, set_patterns ] = useState([]);
	const [ palettes, set_palettes ] = useState([]);
	const [ solid_color, set_solid_color ] = useState({});
	const [ loading, set_loading ] = useState(true);
	const [ mode_specific_settings, set_mode_specific_settings ] = useState('');

	function camelize(str) {
		return str
			.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
				return index === 0 ? word.toLowerCase() : word.toUpperCase();
			})
			.replace(/\s+/g, '');
	}

	const update_leds = async (field_name, value) => {
		try {
			const res = await API.update_leds(query_url, field_name, value);
			// set_settings(res);

			if (field_name === 'pattern') {
				let pattern = camelize(patterns[value]);
				console.log(pattern);
				set_mode_specific_settings(pattern);
				// history.push(link);
				// document.location = link;
			}
		} catch (err) {
			console.log(err);
		}
	};

	const update_rgb = async (field_name, value) => {
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
			// settings.map((setting) => {
			// 	return (saved_settings[setting.name] = setting.value);
			// });
			settings.map((setting) => {
				return (saved_settings[setting.name] = setting);
			});
			console.log(saved_settings.autoplay.value);
			set_settings(saved_settings);
			set_patterns(settings[2].options);
			set_palettes(settings[3].options);

			// let color = saved_settings.solidColor.split(',');
			// set_solid_color({ red: parseInt(color[0]), blue: parseInt(color[1]), green: parseInt(color[2]) });
			// console.log({ saved_settings });
			// let pattern = camelize(saved_settings.pattern.value);

			set_loading(false);
			set_mode_specific_settings(saved_settings.pattern.value);
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
		<Router>
			<div className="content w-100">
				{loading ? (
					<h1>Loading...</h1>
				) : (
					settings && (
						<div className="column w-100">
							{/* <div className="jc-e">
								<Link to="/pattern">
									<button className="btn btn-nav">Pattern</button>
								</Link>
								<Link to="/strobe">
									<button className="btn btn-nav">Strobe</button>
								</Link>
								<Link to="/solid">
									<button className="btn btn-nav">Solid Color</button>
								</Link>
								<Link to="/shootingstar">
									<button className="btn btn-nav">Shooting Star</button>
								</Link>
								<Link to="/sparkle">
									<button className="btn btn-nav">Sparkle</button>
								</Link>
							</div> */}

							{/* <h1 className="t-a-c">Pattern</h1> */}
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
							<DropdownSelector
								update_function={update_leds}
								data={palettes}
								setting={settings.palette}
								settings={settings}
							/>
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

							<Route
								path="/sparkle"
								component={() => (
									<SparklePage>
										<h1 className="t-a-c">Sparkle</h1>
										<SettingSlider
											display_name="Sparkle Speed"
											setting_name="sparkleSpeed"
											update_function={update_leds}
											setting={settings}
										/>
										<SettingSlider
											display_name="Sparkle Density"
											setting_name="sparkleDensity"
											update_function={update_leds}
											setting={settings}
										/>
									</SparklePage>
								)}
							/>
							<Route
								path="/pattern"
								component={() => (
									<PatternPage>
										<ToggleSwitch
											display_name="Blend"
											setting_name="blend"
											update_function={update_leds}
											setting={settings}
										/>
									</PatternPage>
								)}
							/>
							<Route
								path="/shootingstar"
								component={() => (
									<ShootingStarPage>
										<SettingSlider
											display_name="Tail Length"
											setting_name="tailLength"
											update_function={update_leds}
											setting={settings}
										/>
									</ShootingStarPage>
								)}
							/>
							<h1 className="t-a-c">Macro Controls</h1>
							<SettingSlider
								update_function={update_leds}
								set_settings={set_settings}
								setting={settings.brightness}
								settings={settings}
							/>
							<SettingSlider
								update_function={update_leds}
								set_settings={set_settings}
								setting={settings.speed}
								settings={settings}
							/>
							{/* <SettingSlider update_function={update_leds} set_settings={set_settings} setting={settings.colorDensity} /> */}
							<ToggleSwitch
								update_function={update_leds}
								set_settings={set_settings}
								setting={settings.autoplay}
								settings={settings}
							/>
							<SettingSlider
								update_function={update_leds}
								set_settings={set_settings}
								setting={settings.autoplayDuration}
								settings={settings}
							/>
							{mode_specific_settings === settings.strobe.name && (
								<div>
									<h1 className="t-a-c">Strobe</h1>
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
							{mode_specific_settings === settings.solidColor.name && (
								<div>
									<h1 className="t-a-c">Solid Color</h1>
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
							<button className="btn primary" onClick={() => reset_device()}>
								Reset
							</button>
						</div>
					)
				)}
			</div>
		</Router>
	);
};

export default Content;
