import axios from 'axios';
import { URLSearchParams } from 'url';
import { DestinyOAuth } from './models/destinyOAuth';

const baseUrl = 'https://www.bungie.net';

export const authenticateDestiny = async (
	code: string,
	clientId: string,
	clientSecret: string
): Promise<DestinyOAuth | undefined> => {
	if (!clientId || !clientSecret) {
		return undefined;
	}

	const data = new URLSearchParams();
	data.append('grant_type', 'authorization_code');
	data.append('code', code);
	data.append('client_id', clientId);
	data.append('client_secret', clientSecret);

	try {
		const response = await axios(baseUrl + '/Platform/App/OAuth/token/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data
		});
		const user: DestinyOAuth = response.data;
		user.partitionKey = user.membership_id;
		user.rowKey = user.token_type;

		return user;
	} catch (err) {
		console.log(err);
		return undefined;
	}
};

export const refreshDestinyToken = async (refreshToken: string) => {
	console.log(refreshToken);
};
