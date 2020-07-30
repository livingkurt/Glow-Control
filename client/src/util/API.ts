import axios from 'axios';

export default {
	update_leds: function(query_url: string, field: string, value: number) {
		return axios.post(`http://${query_url}/${field}?value=${value}`);
	},
	get_change: function(query_url: string, field: string, value: number) {
		return axios.get(`http://${query_url}/${field}?value=${value}`);
	}
};
