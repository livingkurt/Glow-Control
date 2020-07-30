"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var body_parser_1 = __importDefault(require("body-parser"));
// import config from './config';
// const config = require('./config');
// import { user_routes, product_routes, order_routes, email_routes } from './routes/index';
// import Product from './models/product';
// mongoose
// 	.connect(config.RESTORED_MONGODB_URI, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		useCreateIndex: true
// 	})
// 	.catch((error: { reason: any }) => console.log(error.reason));
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// app.use('/api/users', user_routes);
// app.use('/api/products', product_routes);
// app.use('/api/orders', order_routes);
// app.use('/api/emails', email_routes);
// app.get('/api/config/paypal', (req, res) => {
// 	res.send(config.PAYPAL_CLIENT_ID);
// });
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/build'));
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
app.get('*', function (request, response) {
    response.sendFile(path_1.default.join(__dirname, 'client/build', 'index.html'));
});
app.listen(3001, function () {
    console.log('Server started at http://localhost:5000');
});
