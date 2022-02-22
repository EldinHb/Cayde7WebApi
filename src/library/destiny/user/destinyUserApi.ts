import { DestinyApi } from '../destinyApi';

export class DestinyUserApi extends DestinyApi {
	public async getMembershipsForCurrentUser() {
		return this.httpClient({
			url: '/platform/user/getmembershipsforcurrentuser/',
			method: 'GET'
		});
	}
}
