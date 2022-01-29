import axios from 'axios';
import { URLSearchParams } from 'url';

export const authenticateDestiny = async (code: string, clientId: string, clientSecret: string) => {
	const data = new URLSearchParams();
	data.append('grant_type', 'authorization_code');
	data.append('code', code);
	data.append('client_id', clientId);
	data.append('client_secret', clientSecret);

	const response = await axios('url', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data
	});

	console.log(response);
};
