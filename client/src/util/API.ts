import axios from 'axios';

export default {
	post_change: function(field: string, value: number) {
		return axios.post(`http://192.168.0.219/${field}?value=${value}`);
	},
	get_change: function(field: string, value: number) {
		return axios.get(`http://192.168.0.219/${field}?value=${value}`);
	}
};
