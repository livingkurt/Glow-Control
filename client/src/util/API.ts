import axios from 'axios';
const headers = {
	'Access-Control-Allow-Origin': '*'
};
export default {
	update_leds: (query_url: string, field: string, value: number) => {
		console.log(`http://${query_url}/${field}?value=${value}`);
		return axios.post(`http://${query_url}/${field}?value=${value}`);
	},
	update_rgb: (query_url: string, red_value: number, green_value: number, blue_value: number) => {
		console.log(`http://${query_url}/rgb?r=${red_value}&g=${green_value}&b=${blue_value}`);
		return axios.post(`http://${query_url}/rgb?r=${red_value}&g=${green_value}&b=${blue_value}`);
	},
	update_hsv: (query_url: string, hue: number, saturation: number, value: number) => {
		console.log(`http://${query_url}/hsv?h=${hue}&s=${saturation}&v=${value}`);
		return axios.post(`http://${query_url}/hsv?h=${hue}&s=${saturation}&v=${value}`);
	},
	get_all_settings: (query_url: string) => {
		return axios.get(`http://${query_url}/all`);
	},
	get_device_name: (query_url: string) => {
		return axios.get(`http://${query_url}/device`);
	},
	reset_device: (query_url: string) => {
		return axios.post(`http://${query_url}/reset`);
	}
};
