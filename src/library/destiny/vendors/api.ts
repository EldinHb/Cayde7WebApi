import { AxiosInstance } from 'axios';
import { Components } from '../models/components';

interface VendorParam {
	characterId: string;
	membershipId: string;
	membershipType: number;
	vendorHash: string;
	components: Components[];
}
export const getVendor = async <T>(client: AxiosInstance, param: VendorParam): Promise<T> => {
	const url =
		'/platform' +
		'/destiny2' +
		`/${param.membershipType}` +
		'/profile' +
		`/${param.membershipId}` +
		'/character' +
		`/${param.characterId}` +
		'/vendors' +
		`/${param.vendorHash}` +
		`/?components=${param.components.join(',')}`;

	const response = await client({
		url,
		method: 'GET'
	});

	return response.data;
};
