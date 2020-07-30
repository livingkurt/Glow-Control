import mongoose from 'mongoose';
export {};
// const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		query_url: {
			type: String,
			required: true
		},
		password: { type: String, required: true },
		isAdmin: { type: Boolean, required: true, default: false },
		isVerified: { type: Boolean, required: true, default: false }
	},
	{
		timestamps: true
	}
);

const userModel = mongoose.model('User', userSchema);

export default userModel;

// module.exports = userModel;
