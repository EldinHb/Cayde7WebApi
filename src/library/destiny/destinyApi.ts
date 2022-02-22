import { AxiosInstance } from 'axios';

export abstract class DestinyApi {
	constructor(protected readonly httpClient: AxiosInstance) { }
}
