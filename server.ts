export {};
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
const PORT = 3001;

// import config from './config';
// const config = require('./config');
// import { user_routes, product_routes, order_routes, email_routes } from './routes/index';
// import Product from './models/product';

mongoose
	.connect('mongodb://localhost/glow_leds_db' || process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.catch((error: { reason: any }) => console.log(error.reason));

const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/api/users', user_routes);
// app.use('/api/products', product_routes);
// app.use('/api/orders', order_routes);
// app.use('/api/emails', email_routes);
// app.get('/api/config/paypal', (req, res) => {
// 	res.send(config.PAYPAL_CLIENT_ID);
// });

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

// app.put('/api/all', async (req, res) => {
// 	// const product = await Product.updateMany({
// 	// 	// $rename: { shipping_price: 'volume' }
// 	// 	$set: { hidden: true }
// 	// 	// $unset: { shipping_price: 1 }
// 	// });
// 	// res.send(product);
// 	const product = await Product.updateMany({ category: 'Caps' }, { $set: { hidden: false } });
// 	console.log(product);
// 	res.send(product);
// });

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
	console.log('Server started at http://localhost:5000');
});
