import { AxiosResponse } from 'axios';
import { ServerResponse } from '../common';
import { DestinyApi } from '../destinyApi';
import { MembershipResponse } from '../models/responses';

export class DestinyUserApi extends DestinyApi {
	public async getMembershipsForCurrentUser(): Promise<AxiosResponse<ServerResponse<MembershipResponse>>> {
		return await this.httpClient({
			url: '/platform/user/getmembershipsforcurrentuser/',
			method: 'GET'
		});
	}
}
