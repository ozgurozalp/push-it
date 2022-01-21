const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const KEYS = {
	publicKey:
		'BHE6C69NFLhQgyyRjjVzHx8tuAInvBwE2KgURVxx4PiBDl0nEoYvam0Ci07N5Hzj4X-gxmdONdXeiStWkbbPE-M',
	privateKey: 'mf85_zZF333UrKOpTb97EGYuo35DB_Nt4g7uSQkyFsM',
};
//set the static path
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());

webpush.setVapidDetails(
	'mailto:mail@ozgurozalp.comi',
	KEYS.publicKey,
	KEYS.privateKey
);

//subscribe route
app.post('/subscribe', (req, res) => {
	//get push subscription object
	const subscription = req.body;

	//send status 201
	res.status(201).json({});

	//create paylod
	const payload = JSON.stringify({ title: 'Node Js Push Notification' });
	console.log(subscription);
	//pass the object into sendNotification
	webpush
		.sendNotification(subscription, payload)
		.catch((err) => console.error(err));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`server started on ${port}`);
});
