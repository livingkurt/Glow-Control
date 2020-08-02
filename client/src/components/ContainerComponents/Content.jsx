import React, { useState, useEffect } from 'react';
import { ColorPicker, SettingSlider, RGBSlider, DropdownSelector } from '../ColorComponents';
import API from '../../util/API';
import { ToggleSwitch } from '../UtilityComponents';

const Content = (props) => {
	const query_url = '192.168.0.152';
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

	const update_leds = async (field_name, value) => {
		try {
			const res = await API.update_leds(query_url, field_name, value);
			set_settings(res);
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
		<div className="content w-100">
			{loading ? (
				<h1>Loading...</h1>
			) : (
				settings && (
					<div className="column w-100">
						<ToggleSwitch
							display_name="Power"
							setting_name="power"
							update_function={update_leds}
							settings={settings}
						/>
						<ToggleSwitch
							display_name="Autoplay"
							setting_name="autoplay"
							update_function={update_leds}
							settings={settings}
						/>
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
						<SettingSlider
							display_name="Brightness"
							setting_name="brightness"
							update_function={update_leds}
							settings={settings}
						/>
						<SettingSlider
							display_name="Autoplay Duration"
							setting_name="autoplayDuration"
							update_function={update_leds}
							settings={settings}
						/>
						<SettingSlider
							display_name="Speed"
							setting_name="speed"
							update_function={update_leds}
							settings={settings}
						/>
						<DropdownSelector
							display_name="Pattern"
							setting_name="pattern"
							update_function={update_leds}
							data={patterns}
							settings={settings}
						/>
						<DropdownSelector
							display_name="Palette"
							setting_name="palette"
							update_function={update_leds}
							data={palettes}
							settings={settings}
						/>
						<button className="button primary" onClick={() => reset_device()}>
							Reset
						</button>
					</div>
				)
			)}
		</div>
	);
};

export default Content;
