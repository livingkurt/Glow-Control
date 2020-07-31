import axios from 'axios';
const headers = {
	'Access-Control-Allow-Origin': '*'
};
export default {
	// update_leds: function(query_url: string, field: string, value: number) {
	// 	console.log(`http://${query_url}/${field}?value=${value}`);
	// 	return axios.post(
	// 		`http://${query_url}/api/${field}?value=${value}`,
	// 		{ crossdomain: true },
	// 		{
	// 			headers: {
	// 				'Access-Control-Allow-Origin': '*',
	// 				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
	// 			}
	// 		}
	// 	);
	// },
	update_leds: function(query_url: string, field: string, value: number) {
		console.log(`http://${query_url}/${field}?value=${value}`);
		return axios.post(`http://${query_url}/${field}?value=${value}`);
	},
	update_solid_color: function(query_url: string, red_value: number, green_value: number, blue_value: number) {
		console.log(`http://${query_url}/solidColor?r=${red_value}&g=${green_value}&b=${blue_value}`);
		return axios.post(`http://${query_url}/solidColor?r=${red_value}&g=${green_value}&b=${blue_value}`);
	},
	get_change: function(query_url: string, field: string, value: number) {
		return axios.get(`http://${query_url}/${field}?value=${value}`);
	}
};
